import { Body, Controller, Post } from '@nestjs/common';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { AuthService } from './auth.service';
import {
  EmailSigninDto,
  SigninAuthDto,
  UsernameSigninDto,
} from './dto/signin-auth.dto';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { User } from '../user/schema/user.schema';

dotenv.config();

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  private async hashPass(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(Number(process.env.SALTROUNDS));
      return await bcrypt.hash(password, salt);
    } catch (error) {
      throw new Error(`err in hashPass: ${error}`);
    }
  }

  private async isValidPassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hash);
    } catch (error) {
      throw new Error(`err in isValidPassword: ${error}`);
    }
  }

  @Post('/signup')
  public async signup(@Body() signupDto: SignupAuthDto): Promise<User> {
    try {
      const hashedPass: string = await this.hashPass(signupDto.password);
      signupDto.password = hashedPass;
    } catch (error) {
      throw new Error(String(error));
    }

    try {
      return await this.authService.signup(signupDto);
    } catch (error) {
      // create error handling for email or username taken in error handler instead of creating functions for checking
      throw new Error(String(error));
    }
  }

  @Post('/signin')
  public async signin(@Body() signinAuthDto: SigninAuthDto) {
    let user = signinAuthDto;

    if (signinAuthDto.email) {
      user = signinAuthDto;
    }

    return user;
  }
}
