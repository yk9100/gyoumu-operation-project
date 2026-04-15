// 任务类型定义

export interface IssueType {
  id: number;
  projectId: number;
  name: string;
  color: string;
  displayOrder: number;
  keyword: string;
  tempSummary?: string | null;
  tempDescription?: string | null;
}

export interface Priority {
  id: number;
  name: string;
  keyword: string;
}

export interface Status {
  id: number;
  projectId: number | null;
  name: string;
  color: string;
}

export interface User {
  id: number;
  userId: string;
  uniqueId: string;
  name: string;
  mailAddress: string;
  roleType: number;
  keyword: string;
  lang: string;
  icon: string;
}

export interface CustomField {
  id: number;
  fieldTypeId: number;
  field: string;
  value: any[];
}

export interface Attachment {
  id: number;
  name: string;
  size: number;
  icon: string;
  url: string;
  image: boolean;
  pdf: boolean;
  video: boolean;
  contentType: string;
  created: string;
  localized: {
    created: string;
  };
}

export interface Localized {
  startDate: string;
  dueDate: string;
  created: string;
  updated: string;
}

export interface Ext {
  updated: string;
}

export interface Changelog {
  field: string;
  fieldType: string;
  hasAttribute: boolean;
  isText: boolean;
  isNotification: boolean;
  type?: string;
  newValue: string | null;
  originalValue: string | null;
  attachment: any | null;
  commit: any | null;
  renderingNewValue?: any | null;
  renderingOriginalValue?: any | null;
}

export interface NotifyResource {
  notificationId: number;
  userId: string;
  user: User;
  alreadyRead: boolean;
  resource: string;
}

export interface TaskComment {
  id: number;
  name: string;
  icon: string;
  createdUserId: string;
  createdUser: User;
  createdOn: string;
  updatedOn: string;
  content: string | null;
  plainContent: string | null;
  changelog: Changelog[];
  notifyResource: NotifyResource[];
  mentionsInContent: any | null;
}

export interface Task {
  fav?: boolean;
  id: number;
  projectId: number;
  issueKey: string;
  keyId: number;
  issueType: IssueType;
  summary: string;
  formattedSummary: string | null;
  description: string;
  formattedDescription: string | null;
  mentionRenderedDescription: string | null;
  resolution: any | null;
  priority: Priority;
  status: Status;
  assignee: User;
  category: any[];
  version: any[];
  milestone: any[];
  startDate: string;
  dueDate: string;
  estimatedHours: any | null;
  actualHours: any | null;
  parentIssueId: any | null;
  createdUser: User;
  created: string;
  updatedUser: User;
  updated: string;
  customFields: CustomField[];
  attachments: Attachment[];
  sharedFiles: any[];
  sharedExternalFileLinks: any[];
  overDue: boolean;
  localized: Localized;
  mentionsInDescription: any | null;
  ext: Ext;
  childIssueSummary: any | null;
  childIssues: Task[];
}
