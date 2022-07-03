import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateGameDto, UpdateGameDto, FindGameDto } from './dto';
import { Game, GameDocument } from './schema/game.schema';
import { Model } from 'mongoose';

@Injectable()
export class GameService {
  constructor(@InjectModel(Game.name) private gameModel: Model<GameDocument>) {}

  public async create(createGameDto: CreateGameDto): Promise<Game> {
    try {
      return await this.gameModel.create(createGameDto);
    } catch (error) {
      throw new Error(String(error));
    }
  }

  public async findAll(query: FindGameDto): Promise<Game[]> {
    try {
      return await this.gameModel.find(query);
    } catch (error) {
      throw new Error(String(error));
    }
  }

  public async findOne(query: FindGameDto): Promise<Game> {
    try {
      return await this.gameModel.findOne(query);
    } catch (error) {
      throw new Error(String(error));
    }
  }

  public async update(updateGameDto: UpdateGameDto): Promise<Game> {
    const _id: string = updateGameDto._id;
    delete updateGameDto._id;

    try {
      return await this.gameModel.findByIdAndUpdate(_id, updateGameDto, {
        new: true,
      });
    } catch (error) {
      throw new Error(String(error));
    }
  }

  public async remove(_id: string): Promise<Game> {
    try {
      return await this.gameModel.findByIdAndRemove(_id);
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
