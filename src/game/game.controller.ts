import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto, UpdateGameDto, FindGameDto } from './dto';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('create')
  create(@Body() createGameDto: CreateGameDto) {
    return this.gameService.create(createGameDto);
  }

  @Get('getall/:key/:value')
  findAll(@Param() query: FindGameDto) {
    return this.gameService.findAll(query);
  }

  @Get('get/:key/:value')
  findOne(@Param() query: FindGameDto) {
    return this.gameService.findOne(query);
  }

  @Patch('update')
  update(@Body() updateGameDto: UpdateGameDto) {
    return this.gameService.update(updateGameDto);
  }

  @Delete('remove/:_id')
  remove(@Param('_id') _id: string) {
    return this.gameService.remove(_id);
  }
}
