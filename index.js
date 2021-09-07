const core = require("@actions/core");
const github = require("@actions/github");

try {
  const github_token = core.getInput("GITHUB_TOKEN");
  const requiredLabels = core.getInput("labels").split(",");
  const labelsInIssue = github.context.payload.issue.labels.map((label) => {
    return label.name;
  });
  const octokit = github.getOctokit(github_token);

  const missingLabels = requiredLabels.filter((requiredLabel) => {
    return !labelsInIssue.includes(requiredLabel);
  });

  const missingLabelsString = missingLabels.join(", ");
  const message =
    "The following label **" +
    missingLabelsString +
    "** does not exist on the issue. Please add these labels to avoid any inconvenience in future.";

  if (labelsInIssue.length === 0) {
    octokit.rest.issues.createComment({
      issue_number: github.context.issue.number,
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      body: message,
    });
  } else if (
    missingLabels.length !== requiredLabels.length &&
    missingLabels.length > 1
  ) {
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
