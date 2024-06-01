import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword()
  password: string;
}

export class SignUpDto extends SignInDto {}

export class ConfirmCreateAuthDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  otp: string;
}
