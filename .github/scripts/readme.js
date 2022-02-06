const path = require("path");
const dir = ".";
const auth = process.env.AUTH;
const {
  zoneExist,
  addZoneContent,
  replaceZoneContent,
  getZoneContent,
} = require("./tools.js");
const fs = require("fs");

const readmeFilePath = path.join(dir, "README.md");

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
  updateReadme(data);
});

const issueZone = {
  start: "<!-- issues start -->",
  end: "<!-- issues end -->",
};

const goalsIssue = [];
const focusIssue = [];
const jobIssue = [];
const researchIssue = [];
const projectIssue = [];

function updateReadme(data) {
  for (let issue of data) {
    let issueTitle = issue.title;
    let issueNumber = issue.number;
    for (let labels of issue.labels) {
      let labelName = labels.name;
      if (labelName === "Goals") {
        goalsIssue.push({
          title: issueTitle,
          number: issueNumber,
        });
      }
      if (labelName === "CurrentlyFocusing") {
        focusIssue.push({
          title: issueTitle,
          number: issueNumber,
        });
      }
      if (labelName === "Job-oriented") {
        jobIssue.push({
          title: issueTitle,
          number: issueNumber,
        });
      }
      if (labelName === "Research-oriented") {
        researchIssue.push({
          title: issueTitle,
          number: issueNumber,
        });
      }
      if (labelName === "Project-oriented") {
        projectIssue.push({
          title: issueTitle,
          number: issueNumber,
        });
      }
    }
  }

  let mdContent = [];
  mdContent.push("#### Issues");
  mdContent.push("##### Goals");
  for (let i of goalsIssue) {
    mdContent.push(`- ${issueAbbrlink(i.title, i.number)}`);
  }
  mdContent.push("##### Currentlt Focusing");
  for (let i of focusIssue) {
    mdContent.push(`- ${issueAbbrlink(i.title, i.number)}`);
  }
  mdContent.push("##### Job-oriented");
  for (let i of jobIssue) {
    mdContent.push(`- ${issueAbbrlink(i.title, i.number)}`);
  }
  mdContent.push("##### Research-oriented");
  for (let i of researchIssue) {
    mdContent.push(`- ${issueAbbrlink(i.title, i.number)}`);
  }
  mdContent.push("##### Project-oriented");
  for (let i of projectIssue) {
    mdContent.push(`- ${issueAbbrlink(i.title, i.number)}`);
  }

  try {
    const oldReadme = fs.readFileSync(
      decodeURIComponent(readmeFilePath),
      "utf8"
    );
    if (zoneExist(oldReadme, issueZone)) {
      fs.writeFileSync(
        readmeFilePath,
        replaceZoneContent(oldReadme, issueZone, mdContent.join("\n\n"))
      );
    } else {
      fs.writeFileSync(
        readmeFilePath,
        addZoneContent(oldReadme, issueZone, mdContent.join("\n\n"))
      );
    }
  } catch (err) {
    console.error(err);
  }
}

function issueAbbrlink(issueTitle, issueNumber) {
  return `[${issueTitle}](https://github.com/youyinnn/masc_research_knowledge_base/issues/${issueNumber})`;
}
