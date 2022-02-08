const path = require("path");
const dir = ".";
const auth = process.env.AUTH;
const paper_reviews_dir = path.join(dir, "paper_review");
const book_reviews_dir = path.join(dir, "book_review");
const fs = require("fs");
const {
  zoneExist,
  addZoneContent,
  replaceZoneContent,
  getZoneContent,
} = require("./tools.js");

const paper_review_list = [];
fs.readdirSync(paper_reviews_dir).forEach((file) => {
  paper_review_list.push(String(file));
});

const book_review_list = [];
fs.readdirSync(book_reviews_dir).forEach((file) => {
  book_review_list.push(String(file));
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

const bookLinkZone = {
  start: "<!-- book_link start -->",
  end: "<!-- book_link end -->",
};

getIssues().then((data) => {
  matchPaperReviewAndUpdateCatchUp(data);
  matchBookReviewAndUpdateCatchUp(data);
});

function matchBookReviewAndUpdateCatchUp(data) {
  for (let issue of data) {
    let issueTitle = issue.title;
    for (let labels of issue.labels) {
      let labelName = labels.name;
      if (labelName === "Book Reading") {
        for (let book of book_review_list) {
          if (issueTitle.toLowerCase().search(book.toLowerCase()) > -1) {
            console.log(`\n====== For ${issueTitle} ======`);
            updateIssueForBook(issue, book);
          }
        }
      }
    }
  }
}

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
    let url = `https://github.com/youyinnn/masc_research_knowledge_base/blob/main/paper_review/${paperName}/${paperNoteFilePath}`;
    if (!zoneExist(issueBody, noteLinkZone)) {
      console.log(issue.title + " " + "create note link");
      newBody = addZoneContent(
        issueBody,
        noteLinkZone,
        `[Paper review](${encodeURI(url)})`
      );
      updateIssueBody(issue.number, newBody).finally(() => {
        updateCul(paper_dir, newBody, issue);
      });
    } else {
      console.log(issue.title + " " + "note link exist");
      let oldNoteLinkContent = getZoneContent(issueBody, noteLinkZone)
        .trim()
        .replace(/\s/g, "");
      let newNoteLinkContent = `[Paper review](${encodeURI(url)})`.replace(
        /\s/g,
        ""
      );
      if (oldNoteLinkContent !== newNoteLinkContent) {
        newBody = replaceZoneContent(
          issueBody,
          noteLinkZone,
          newNoteLinkContent
        );
        updateIssueBody(issue.number, newBody).finally(() => {
          updateCul(paper_dir, newBody, issue);
        });
      } else {
        updateCul(paper_dir, issueBody, issue);
      }
    }
  } else {
    updateCul(paper_dir, issueBody, issue);
  }
}

function updateCul(paper_dir, issueBody, issue) {
  let issueNumber = issue.number;
  let paper_catch_up_path = path.join(paper_dir, "catch-up-list.md");

  fs.stat(paper_catch_up_path, function (err, stat) {
    if (err == null) {
      console.log(issue.title + " " + "catch up file exists");
      let culIfExist = getZoneContent(issueBody, culZone);
      let newBody = null;
      const culData = fs
        .readFileSync(decodeURIComponent(paper_catch_up_path), "utf8")
        .trim();

      if (culIfExist === null) {
        console.log(issue.title + " " + "create cul");
        newBody = addZoneContent(
          issueBody,
          culZone,
          `<details><summary>Catch-up knowledge</summary>\n\n${culData}\n\n</details>`
        );
      } else {
        console.log(issue.title + " " + "cul exist");
        culIfExist = culIfExist
          .replace("<details><summary>Catch-up knowledge</summary>", "")
          .replace("</details>", "");

        // it is all about the fucking whitespace
        if (culIfExist.replace(/\s/g, "") === culData.replace(/\s/g, "")) {
          console.log(issue.title + " " + "same cul");
        } else {
          console.log(issue.title + " " + "diff cul");
          let replcaement = `<details><summary>Catch-up knowledge</summary>\n\n${culData}\n\n</details>`;
          newBody = replaceZoneContent(issueBody, culZone, replcaement);
        }
      }
      if (newBody !== null) {
        updateIssueBody(issueNumber, newBody);
      }
    } else if (err.code === "ENOENT") {
    } else {
      console.log(issue.title + " " + "some other error: ", err.code);
    }
  });
}

function updateIssueForBook(issue, bookName) {
  let issueBody = issue.body;
  let book_dir = path.join(book_reviews_dir, bookName);
  let md_line = [];
  let newBody = null;
  md_line.push("#### Review");
  fs.readdirSync(book_dir).forEach((file) => {
    let url = `https://github.com/youyinnn/masc_research_knowledge_base/blob/main/book_review/${book_dir}/${file}`;
    md_line.push(`- [${file}](${encodeURI(url)})`);
  });
  let bookZoneContent = md_line.join("\n\n");
  if (zoneExist(issueBody, bookLinkZone)) {
    let oldBody = getZoneContent(issueBody, bookLinkZone);
    if (oldBody.replace(/\s/gm, "") === bookZoneContent.replace(/\s/gm, "")) {
      console.log(issue.title + " " + "book link zone same");
    } else {
      console.log(issue.title + " " + "book link zone diff");
      newBody = replaceZoneContent(issueBody, bookLinkZone, bookZoneContent);
    }
  } else {
    console.log(issue.title + " " + "book link zone create");
    newBody = addZoneContent(issueBody, bookLinkZone, bookZoneContent);
  }
  if (newBody !== null) {
    updateIssueBody(issue.number, newBody);
  }
}

const updateIssueBody = async function (issue_number, body) {
  await octokit.request("PATCH /repos/{owner}/{repo}/issues/{issue_number}", {
    owner,
    repo,
    issue_number,
    body,
  });
};
