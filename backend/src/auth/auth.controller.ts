import { Controller, Get, Post, Body } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { AuthService } from './auth.service';
import { ConfirmCreateAuthDto, SignInDto, SignUpDto, MeResponse, SignUpResponse } from './dto';
import { Public } from 'src/common/decorators/public.decorator';
import { SignInResponse } from './dto/responses/sign-in.dto';
import { GetBearerToken } from 'src/common/decorators/get-bearer.decorator';
import { SignUpConfirmResponse } from './dto/responses/sign-up-confirm.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto): Promise<SignUpResponse> {
    const response = await this.authService.create(signUpDto);
    return plainToInstance(SignUpResponse, {
      success: true,
      verified: response.UserConfirmed
    });
  }

  @Public()
  @Post('sign-up/confirm')
  async signUpConfirm(@Body() confirmCreateAuthDto: ConfirmCreateAuthDto): Promise<SignUpConfirmResponse> {
    const response = await this.authService.confirm(confirmCreateAuthDto);
    return plainToInstance(SignUpConfirmResponse, {
      success: response
    });
  }

  @Public()
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto): Promise<SignInResponse> {
    const response = await this.authService.get(signInDto);
    return plainToInstance(SignInResponse, {
      type: response.TokenType,
      accessToken: response.AccessToken,
      refreshToken: response.RefreshToken,
      expiresIn: response.ExpiresIn
    });
  }

  @ApiBearerAuth()
  @Get('me')
  async me(@GetBearerToken() accessToken: string): Promise<MeResponse> {
    const response = await this.authService.me(accessToken);
    const attributes: Record<'sub' | 'email' | 'email_verified', string> = {
      sub: '',
      email: '',
      /* eslint-disable camelcase */
      email_verified: ''
    };
    response.UserAttributes.map(({ Name, Value }) => {
      attributes[Name] = Value;
    });
    return plainToInstance(MeResponse, {
      id: attributes.sub,
      email: attributes.email,
      verified: attributes.email_verified === 'true'
    });
  }
}
