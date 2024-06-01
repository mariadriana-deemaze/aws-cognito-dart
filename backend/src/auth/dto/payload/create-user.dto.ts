import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    example: '123456',
    description: 'Confirmation code of 6 digits'
  })
  otp: string;
}
