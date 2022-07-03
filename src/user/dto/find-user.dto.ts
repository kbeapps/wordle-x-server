import { Game } from 'src/game/schema/game.schema';
import { User } from '../schema/user.schema';
import { Group } from 'src/group/schema/group.schema';

// TODO Add validation to ensure search queries only contain one key value pair (for all find ones)
export class FindUserDto {
  _id?: string;
  email?: string;
  username?: string;
  games?: Game[];
  friends?: User[];
  groups?: Group[];
}
