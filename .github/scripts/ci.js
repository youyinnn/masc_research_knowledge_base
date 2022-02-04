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
    if (noteLinkBlockNotExist(issueBody)) {
      console.log("create note link");
      let url = `https://github.com/youyinnn/masc_research_knowledge_base/blob/main/paper_review/${paperName}/${paperNoteFilePath}`;
      newBody =
        issueBody +
        `\n\n-------\n\n<!-- note start -->\n\n[Paper review](${encodeURI(
          url
        )})\n\n<!-- note end -->
        `;
      updateIssueBody(issue.number, newBody).finally(() => {
        updateCul(paper_dir, newBody, issue.number);
      });
    } else {
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
      let culIfExist = getCatchUpListBlockFromIssueBody(issueBody);
      let newBody = null;
      const culData = fs
        .readFileSync(decodeURIComponent(paper_catch_up_path), "utf8")
        .trim();

      if (culIfExist === null) {
        console.log("create cul");
        newBody =
          issueBody +
          `\n\n-------\n\n<!-- cul start -->\n\n<details><summary>Catch-up knowledge</summary>\n\n${culData}\n\n</details>\n\n<!-- cul end -->
        `;
      } else {
        culIfExist = culIfExist
          .replace("<details><summary>Catch-up knowledge</summary>", "")
          .replace("</details>", "");

        // console.log(culData.trim());
        // console.log("==========");
        // console.log(culIfExist.trim());

        if (culData.trim() === culIfExist.trim()) {
          console.log("same cul");
        } else {
          console.log("diff cul");
          newBody = replaceCulStr(issueBody, culData);
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

function getCatchUpListBlockFromIssueBody(issueBody) {
  let startIdx = issueBody.indexOf("<!-- cul start -->");
  if (startIdx > -1) {
    console.log("cul exist");
    let endIdx = issueBody.indexOf("<!-- cul end -->");
    return issueBody.substring(startIdx + 18, endIdx).trim();
  } else {
    return null;
  }
}

function noteLinkBlockNotExist(issueBody) {
  return issueBody.indexOf("<!-- note start -->") === -1;
}

function replaceCulStr(issueBody, culData) {
  let startIdx = issueBody.indexOf("<!-- cul start -->");
  let endIdx = issueBody.indexOf("<!-- cul end -->");
  return (
    issueBody.substring(0, startIdx + 19) +
    `\n\n<details><summary>Catch-up knowledge</summary>\n\n${culData}\n\n</details>\n\n` +
    issueBody.substring(endIdx, issueBody.length)
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
