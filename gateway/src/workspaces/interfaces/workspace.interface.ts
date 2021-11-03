import { IAgent } from './agent.interface';
import { IRole } from './role.interface';

export interface IWorkspace {
  id: string;
  name: string;
  description?: string;
  creatorId: number;
  labels: string[];
  roles: IRole[];
  createdAt: string;
  updatedAt: string;
  //
  agent?: IAgent;
}
