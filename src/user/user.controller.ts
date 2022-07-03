import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignupAuthDto } from 'src/auth/dto/signup-auth.dto';
import { FindUserDto, UpdateUserDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  create(signupDto: SignupAuthDto) {
    return this.userService.create(signupDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('get/:key/:value')
  findOne(@Param() query: FindUserDto) {
    return this.userService.findOne(query);
  }

  @Patch('update')
  update(@Body() updateuserDto: UpdateUserDto) {
    return this.userService.update(updateuserDto);
  }

  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
