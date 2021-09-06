const core = require("@actions/core");
const github = require("@actions/github");

try {
  const github_token = core.getInput("GITHUB_TOKEN");
  const requiredLabels = core.getInput("labels").split(",");
  const labelsInIssue = github.context.payload.issue.labels.map((label) => {
    return label.name;
  });
  const octokit = github.getOctokit(github_token);

<<<<<<< HEAD
  let issueLabels = [];

  labelsObject.forEach((item, index) => issueLabels.push(item.name));

  let missingLabels = [];

  for (let index = 0; index < Labels.length; index++) {
    if (issueLabels.includes(Labels[index])) {
    } else {
      missingLabels.push(Labels[index]);
    }
  }

  if (missingLabels.length > 1) {
    missingLabelsString = missingLabels.join(", ");
=======
  const missingLabels = requiredLabels.filter((requiredLabel) => {
    return !labelsInIssue.includes(requiredLabel);
  });

  if (missingLabels.length > 0) {
    const missingLabelsString = missingLabels.join(", ");
>>>>>>> ba95e45751ada2197155d5cab305ae22217cae61
    const message =
      "The following label **" +
      missingLabelsString +
      "** does not exist on the issue. Please add these labels to avoid any inconvenience in future.";

    octokit.rest.issues.createComment({
      issue_number: github.context.issue.number,
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      body: message,
    });
  }
} catch (error) {
  core.setFailed(error.message);
}
