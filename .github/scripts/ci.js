const path = require("path");
const dir = ".";
const auth = process.env.AUTH;
const paper_reviews_dir = path.join(dir, "paper_review");
const fs = require("fs");

const paper_review_list = [];
fs.readdirSync(paper_reviews_dir).forEach((file) => {
  paper_review_list.push(String(file));
});

const { Octokit } = require("@octokit/core");
const octokit = new Octokit({ auth: auth });

const owner = "youyinnn";
const repo = "masc_research_knowledge_base";

const getIssues = async function () {
  const { data } = await octokit.request("GET /repos/{owner}/{repo}/issues", {
    owner,
    repo: repo,
  });
  return data;
};

const culZone = {
  start: "<!-- cul start -->",
  end: "<!-- cul end -->",
};

const noteLinkZone = {
  start: "<!-- note start -->",
  end: "<!-- note end -->",
};

getIssues().then((data) => {
  matchPaperReviewAndUpdateCatchUp(data);
});

function matchPaperReviewAndUpdateCatchUp(data) {
  for (let issue of data) {
    let issueTitle = issue.title;
    for (let labels of issue.labels) {
      let labelName = labels.name;
      if (labelName === "Paper Reading") {
        for (let paper of paper_review_list) {
          if (issueTitle.endsWith(paper)) {
            console.log(`\n====== For ${issueTitle} ======`);
            updateIssue(issue, paper);
          }
        }
      }
    }
  }
}

function updateIssue(issue, paperName) {
  let issueBody = issue.body;
  let paper_dir = path.join(paper_reviews_dir, paperName);
  let paperNoteFilePath = null;
  fs.readdirSync(paper_dir).forEach((file) => {
    if (file.endsWith(".pdf")) {
      paperNoteFilePath = file;
    }
  });
  if (paperNoteFilePath !== null) {
    console.log("note file exists");
    if (!zoneExist(issueBody, noteLinkZone)) {
      console.log("create note link");
      let url = `https://github.com/youyinnn/masc_research_knowledge_base/blob/main/paper_review/${paperName}/${paperNoteFilePath}`;
      newBody = addZoneContent(
        issueBody,
        noteLinkZone,
        `[Paper review](${encodeURI(url)})`
      );
      updateIssueBody(issue.number, newBody).finally(() => {
        updateCul(paper_dir, newBody, issue.number);
      });
    } else {
      console.log("note link exist");
      updateCul(paper_dir, issueBody, issue.number);
    }
  } else {
    updateCul(paper_dir, issueBody, issue.number);
  }
}

function updateCul(paper_dir, issueBody, issueNumber) {
  let paper_catch_up_path = path.join(paper_dir, "catch-up-list.md");

  fs.stat(paper_catch_up_path, function (err, stat) {
    if (err == null) {
      console.log("catch up file exists");
      let culIfExist = getZoneContent(issueBody, culZone);
      let newBody = null;
      const culData = fs
        .readFileSync(decodeURIComponent(paper_catch_up_path), "utf8")
        .trim();

      if (culIfExist === null) {
        console.log("create cul");
        newBody = addZoneContent(
          issueBody,
          culZone,
          `<details><summary>Catch-up knowledge</summary>\n\n${culData}\n\n</details>`
        );
      } else {
        console.log("cul exist");
        culIfExist = culIfExist
          .replace("<details><summary>Catch-up knowledge</summary>", "")
          .replace("</details>", "");

        // it is all about the fucking whitespace
        if (culIfExist.replace(/\s/g, "") === culData.replace(/\s/g, "")) {
          console.log("same cul");
        } else {
          console.log("diff cul");
          let replcaement = `<details><summary>Catch-up knowledge</summary>\n\n${culData}\n\n</details>`;
          newBody = replaceZoneContent(issueBody, culZone, replcaement);
        }
      }
      if (newBody !== null) {
        updateIssueBody(issueNumber, newBody);
      }
    } else if (err.code === "ENOENT") {
    } else {
      console.log("Some other error: ", err.code);
    }
  });
}

function zoneExist(text, zone) {
  return text.indexOf(zone.start) > -1;
}

function getZoneContent(text, zone) {
  let startIdx = text.indexOf(zone.start);
  if (startIdx > -1) {
    let endIdx = text.indexOf(zone.end);
    return text.substring(startIdx + zone.start.length, endIdx).trim();
  } else {
    return null;
  }
}

function addZoneContent(text, zone, content) {
  return (
    text +
    `\n\n-------\n` +
    `\n${zone.start}\n` +
    `\n${content}\n` +
    `\n${zone.end}\n\n`
  );
}

function replaceZoneContent(text, zone, replacement) {
  let startIdx = text.indexOf(zone.start);
  let endIdx = text.indexOf(zone.end);
  return (
    text.substring(0, startIdx + zone.start.length) +
    "\n\n" +
    replacement +
    "\n\n" +
    text.substring(endIdx, text.length)
  );
}

const updateIssueBody = async function (issue_number, body) {
  await octokit.request("PATCH /repos/{owner}/{repo}/issues/{issue_number}", {
    owner,
    repo,
    issue_number,
    body,
  });
};
