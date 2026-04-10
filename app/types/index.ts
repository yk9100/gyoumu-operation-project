export enum ETaskStatus {
  All = "All",
  Open = "Open",
  InProgress = "InProgress",
  Resolved = "Resolved",
  Verified = "Verified",
  Closed = "Closed",
  NotClosed = "NotClosed",
}

export enum ESubTaskStatus {
  All = "All",
  ParentIssus = "ParentIssus",
  ExcludeChildIssus = "ExcludeChildIssus",
}

export enum EIssueType {
  Release = "Release",
  Confirmation = "Confirmation",
  Bug = "Bug",
  Improvement = "Improvement",
  Task = "Task",
  Other = "Other",
  TestEnvironment = "TestEnvironment",
}

export enum ETaskCategory {
  NoCategory = "NoCategory",
  Scene = "Scene",
  Editor = "Editor",
  Mokuji = "Mokuji",
  Search = "Search",
  API = "API",
}

export interface IOption {
  label: string;
  value: string;
}
