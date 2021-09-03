# Required Labels Github Action

This action prints the comment on an issue if the required labels are not added in the issue. The required actions can be added in the action input using comma seperated values

## Inputs

## `labels`

**Required** The name of the labels that are required.

Example:

```
labels: "Todo, Bug"
```

## `GITHUB_TOKEN`

GitHub automatically creates a `GITHUB_TOKEN` secret to use in your workflow. You can use the `GITHUB_TOKEN` to authenticate in a workflow run.

Example:
`GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}`

## Outputs

This action doesn't output anything

## Example usage

```yaml
on:
  issues:
    types: [opened, edited]

jobs:
  required_labels:
    runs-on: ubuntu-latest
    name: Required Labels
    steps:
      - name: Required Labels
        uses: muhaddimu/required-labels@master
        with:
          labels: "Todo, Bug"
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Submit Issues

Facing any Issues or weird behavior(yes, action behave)? Feel free to open a [new issue](https://github.com/Foretheta/required-labels/issues/new)

---

License [MIT](https://github.com/foretheta/required-labels/blob/master/LICENSE)
