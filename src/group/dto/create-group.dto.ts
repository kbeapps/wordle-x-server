import { User } from 'src/user/schema/user.schema';

export class CreateGroupDto {
  owner: User;
  groupName: string;
  members?: User[];
}
