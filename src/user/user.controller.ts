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
  constructor(private readonly userService: UserService) {}

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
    let status = 200;

    try {
      return this.userService.findOne(query);
    } catch (err) {
      status = 500;
      // utils.errHandler(source, String(err));
    }

    // utils.responseHandler(res, status, 'getUser', user);
  }

  @Patch('update')
  update(@Body() updateuserDto: UpdateUserDto) {
    return this.userService.update(updateuserDto);
  }

  @Delete('remove/:_id')
  remove(@Param('_id') _id: string) {
    return this.userService.remove(_id);
  }
}
