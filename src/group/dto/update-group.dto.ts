import { PartialType } from '@nestjs/mapped-types';
import { CreateGroupDto } from './create-group.dto';
import { User } from 'src/user/schema/user.schema';

export class UpdateGroupDto extends PartialType(CreateGroupDto) {
  _id?: string;
  owner?: User;
  groupName?: string;
  members?: User[];
}
