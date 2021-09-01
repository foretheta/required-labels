const core = require("@actions/core");
const github = require("@actions/github");

try {
  const github_token = core.getInput("GITHUB_TOKEN");
  const Labels = core.getInput("labels").split(",");
  const labelsObject = github.context.payload.issue.labels;

  let issueLabels = [];

  labelsObject.forEach((item, index) => issueLabels.push(item.name));

  const time = new Date().toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow

  for (let index = 0; index < Labels.length; index++) {
    if (issueLabels.includes(Labels[index])) {
      console.log(Labels[index], " issue exists");
    } else {
      const message =
        ("The following labels " + Labels[index],
        " does not exist on the issue. Please add these labels to avoid any inconvenience");

      const octokit = github.getOctokit(github_token);

      octokit.rest.issues.createComment({
        issue_number: github.context.payload.issue.number,
        body: message,
      });

      // Let them know
    }
  }

  const payload = JSON.stringify(github.context.payload, undefined, 2);

  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
