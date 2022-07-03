import { Body, Controller, Post } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { hash, genSalt, compare } from 'bcrypt';
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
      const salt = await genSalt(Number(process.env.SALTROUNDS));
      return await hash(password, salt);
    } catch (error) {
      throw new Error(`err in hashPass: ${error}`);
    }
  }

  private async isValidPassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    try {
      return await compare(password, hash);
    } catch (error) {
      throw new Error(`err in isValidPassword: ${error}`);
    }
  }

  @Post('signup')
  public async signup(@Body() signupDto: SignupAuthDto): Promise<User> {
    let message = '';
    let status = 200;

    const isEmailTaken = await this.authService.isEmailTaken(signupDto.email);

    const isUsernameTaken = await this.authService.isUsernameTaken(
      signupDto.username,
    );

    if (isEmailTaken) {
      message = 'email already in use.';
      status = 400;
      throw new Error('email already in use.');
    }

    if (isUsernameTaken) {
      message = 'username already in use.';
      status = 400;
      throw new Error('username already in use.');
    }

    if (!isEmailTaken && !isUsernameTaken) {
      try {
        const hashedPass: string = await this.hashPass(signupDto.password);
        signupDto.password = hashedPass;
      } catch (error) {
        throw new Error(String(error));
      }

      try {
        console.log('here');
        return await this.authService.signup(signupDto);
      } catch (error) {
        // TODO create error handling for email or username taken in error handler instead of creating functions for checking
        throw new Error(error);
      }
    }
  }

  @Post('signin')
  public async signin(@Body() signinAuthDto: SigninAuthDto) {
    let user: EmailSigninDto | UsernameSigninDto;

    signinAuthDto.email
      ? (user = signinAuthDto as EmailSigninDto)
      : (user = signinAuthDto as UsernameSigninDto);

    return user;
  }
}
