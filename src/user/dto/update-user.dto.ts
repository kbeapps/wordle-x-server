import { Game } from 'src/game/schema/game.schema';
import { User } from '../schema/user.schema';
import { Group } from 'src/group/schema/group.schema';

export class UpdateUserDto {
  _id: string;
  email?: string;
  username?: string;
  password?: string;
  avatar?: string;
  games?: Game[];
  friends?: User[];
  groups?: Group[];
}
