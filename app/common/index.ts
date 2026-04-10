import {
  ETaskStatus,
  ESubTaskStatus,
  EIssueType,
  ETaskCategory,
} from "@/types/index";

export const TASK_STATUS_OPTIONS = [
  {
    label: "All",
    value: ETaskStatus.All,
  },
  {
    label: "Open",
    value: ETaskStatus.Open,
  },
  {
    label: "In Progress",
    value: ETaskStatus.InProgress,
  },
  {
    label: "Resolved",
    value: ETaskStatus.Resolved,
  },
  {
    label: "検証機確認済",
    value: ETaskStatus.Verified,
  },
  {
    label: "Closed",
    value: ETaskStatus.Closed,
  },
  {
    label: "Not Closed",
    value: ETaskStatus.NotClosed,
  },
];

export const SUB_TASK_STATUS_OPTIONS = [
  {
    label: "All",
    value: ESubTaskStatus.All,
  },
  {
    label: "Parent issus",
    value: ESubTaskStatus.ParentIssus,
  },
  {
    label: "Exclude child issus ",
    value: ESubTaskStatus.ExcludeChildIssus,
  },
];

export const ISSUE_TYPE_LABLE_MAP = {
  [EIssueType.Release]: "リリース",
  [EIssueType.Confirmation]: "確認",
  [EIssueType.Bug]: "バグ",
  [EIssueType.Improvement]: "要望",
  [EIssueType.Task]: "タスク",
  [EIssueType.Other]: "その他",
  [EIssueType.TestEnvironment]: "検証環境",
};

export const ISSUE_TYPE_OPTIONS = [
  {
    label: ISSUE_TYPE_LABLE_MAP[EIssueType.Release],
    value: EIssueType.Release,
  },
  {
    label: ISSUE_TYPE_LABLE_MAP[EIssueType.Confirmation],
    value: EIssueType.Confirmation,
  },
  {
    label: ISSUE_TYPE_LABLE_MAP[EIssueType.Bug],
    value: EIssueType.Bug,
  },
  {
    label: ISSUE_TYPE_LABLE_MAP[EIssueType.Improvement],
    value: EIssueType.Improvement,
  },
  {
    label: ISSUE_TYPE_LABLE_MAP[EIssueType.Task],
    value: EIssueType.Task,
  },
  {
    label: ISSUE_TYPE_LABLE_MAP[EIssueType.Other],
    value: EIssueType.Other,
  },
  {
    label: ISSUE_TYPE_LABLE_MAP[EIssueType.TestEnvironment],
    value: EIssueType.TestEnvironment,
  },
];

const TASK_CATEGORY_LABLE_MAP = {
  [ETaskCategory.NoCategory]: "No Category",
  [ETaskCategory.Scene]: "画面",
  [ETaskCategory.Editor]: "エディタ",
  [ETaskCategory.Mokuji]: "目次",
  [ETaskCategory.Search]: "検索",
  [ETaskCategory.API]: "API",
};

export const TASK_CATEGORY_OPTIONS = [
  {
    label: TASK_CATEGORY_LABLE_MAP[ETaskCategory.NoCategory],
    value: ETaskCategory.NoCategory,
  },
  {
    label: TASK_CATEGORY_LABLE_MAP[ETaskCategory.Scene],
    value: ETaskCategory.Scene,
  },
  {
    label: TASK_CATEGORY_LABLE_MAP[ETaskCategory.Editor],
    value: ETaskCategory.Editor,
  },
  {
    label: TASK_CATEGORY_LABLE_MAP[ETaskCategory.Mokuji],
    value: ETaskCategory.Mokuji,
  },
  {
    label: TASK_CATEGORY_LABLE_MAP[ETaskCategory.Search],
    value: ETaskCategory.Search,
  },
  {
    label: TASK_CATEGORY_LABLE_MAP[ETaskCategory.API],
    value: ETaskCategory.API,
  },
];
