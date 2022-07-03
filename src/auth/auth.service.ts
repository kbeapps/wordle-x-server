import { Injectable } from '@nestjs/common';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { User } from 'src/user/schema/user.schema';
import { UserService } from 'src/user/user.service';
import { EmailSigninDto, UsernameSigninDto } from './dto/signin-auth.dto';

@Injectable({})
export class AuthService {
  constructor(private userService: UserService) {}

  public async isEmailTaken(email: string): Promise<boolean> {
    try {
      const emailInUse = await this.userService.findOne({ email: email });

      return emailInUse ? true : false;
    } catch (error) {
      console.log(error);
    }

    return false;
  }

  public async isUsernameTaken(username: string): Promise<boolean> {
    try {
      const usernameInUse = await this.userService.findOne({
        username: username,
      });

      return usernameInUse ? true : false;
    } catch (error) {
      console.log(error);
    }

    return false;
  }

  public async signup(signupDto: SignupAuthDto): Promise<User> {
    try {
      const user: User = await this.userService.create(signupDto);

      delete user.password;
      return user;
    } catch (error) {
      throw new Error(String(error));
    }
  }

  public async signin(signinAuthDto: EmailSigninDto | UsernameSigninDto) {
    let user = signinAuthDto;
    if (signinAuthDto.email) {
      user = signinAuthDto;
    }
    return user;
  }
}
