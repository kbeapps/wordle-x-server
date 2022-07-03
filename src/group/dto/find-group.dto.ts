import { User } from 'src/user/schema/user.schema';

export class FindGroupDto {
  _id?: string;
  owner?: User;
  groupName?: string;
  members?: User[];
}
