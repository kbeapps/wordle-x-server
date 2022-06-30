export class SigninAuthDto {
  email?: string;
  username?: string;
  password: string;
}

export class EmailSigninDto extends SigninAuthDto {
  email: string;
  password: string;
}

export class UsernameSigninDto extends SigninAuthDto {
  username: string;
  password: string;
}
