import type { ID } from './base.interface';

export enum IssueFilterField {
  ASSIGNEE_ID = 'assigneeId',
}

export interface IFilter {
  id: ID;
  ownerId: ID;
  name: string;
  schema: string;
}
