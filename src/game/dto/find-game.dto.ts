import { User } from 'src/user/schema/user.schema';

export class FindGameDto {
  _id?: string;
  name?: string;
  owner?: User;
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
