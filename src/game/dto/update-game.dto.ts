import { PartialType } from '@nestjs/mapped-types';
import { CreateGameDto } from './create-game.dto';
import { User } from 'src/user/schema/user.schema';

export class UpdateGameDto extends PartialType(CreateGameDto) {
  _id: string;
  name?: string;
  players?: User[];
  wordHistory?: string[];
  boards?: {
    user: User;
    guessEvaluation: [string];
  }[];
  type?: string;
  winCondition?: string;
  wordSize?: number;
  theme?: string;
}
