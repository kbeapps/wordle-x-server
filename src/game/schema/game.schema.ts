import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/user/schema/user.schema';

export type GameDocument = Game & Document;

@Schema({ timestamps: true })
export class Game {
  @Prop({ required: true, minLength: 2, maxLength: 16 })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  owner: User;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    required: true,
    min: 1,
    max: 20,
  })
  players: User[];

  @Prop({ type: [String], required: true, min: 1, max: 365 })
  wordHistory: string[];

  @Prop({
    type: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        guessEvaluation: [String],
      },
    ],
  })
  boards: {
    user: User;
    guessEvaluation: [string];
  }[];

  @Prop({ required: true, min: 1, max: 20 })
  type: string;

  @Prop({ required: true, min: 1, max: 20 })
  winCondition: string;

  @Prop({ required: true, min: 4, max: 10 })
  wordSize: number;

  @Prop({ min: 1, max: 20 })
  theme: string;
}

export const GameSchema = SchemaFactory.createForClass(Game);
