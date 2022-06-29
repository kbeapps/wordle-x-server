import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Game } from 'src/game/schema/game.schema';
import { Group } from 'src/group/schema/group.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true, minLength: 5, maxLength: 16 })
  username: string;

  @Prop({ required: true, minLength: 5, maxLength: 20 })
  password: string;

  @Prop()
  avatar?: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }] })
  games?: Game[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  friends?: User[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }] })
  groups?: Group[];
}

export const UserSchema = SchemaFactory.createForClass(User);
