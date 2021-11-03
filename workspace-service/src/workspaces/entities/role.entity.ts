import { Exclude, Transform } from 'class-transformer';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { BaseRole, Privilege } from '../interfaces/role.interface';

@Entity()
export class Role {
  @ObjectIdColumn()
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  id: ObjectID;

  @Column({ length: 100 })
  name: string;

  @Exclude({ toClassOnly: true })
  @Column({ type: 'enum', enum: Privilege, array: true })
  privileges: Privilege[];

  constructor(role?: Partial<Role>) {
    Object.assign(this, role);
  }
}

export const Admin = new Role({
  name: BaseRole.ADMIN,
  privileges: Object.values(Privilege),
});

export const Worker = new Role({
  name: BaseRole.WORKER,
});
