const core = require("@actions/core");
const github = require("@actions/github");

try {
  const github_token = core.getInput("GITHUB_TOKEN");
  const Labels = core.getInput("labels").split(",");
  const labelsObject = github.context.payload.issue.labels;
  const octokit = github.getOctokit(github_token);

  let issueLabels = [];

  labelsObject.forEach((item, index) => issueLabels.push(item.name));

  const time = new Date().toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow

  let missingLabels = [];

  for (let index = 0; index < Labels.length; index++) {
    if (issueLabels.includes(Labels[index])) {
      console.log(Labels[index], " issue exists");
    } else {
      missingLabels.push(Labels[index]);
      // Let them know
    }

    if (missingLabels.length > 0) {
      const message =
        "The following labels **" +
        missingLabels.replace(/,[s]*/g, ", ") +
        "** does not exist on the issue. Please add these labels to avoid any inconvenience in future.";

      octokit.rest.issues.createComment({
        issue_number: github.context.issue.number,
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        body: message,
      });
    }
  }

  const payload = JSON.stringify(github.context.payload, undefined, 2);

  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
