import type { ID } from './base.interface';

export interface IStatus {
  id: ID;
  projectId: ID;
  name: string;
  color?: string;
  isFirst: boolean;
  isLast: boolean;
}

export interface IHydratedStatus extends IStatus {
  transitions: IStatus[];
}
