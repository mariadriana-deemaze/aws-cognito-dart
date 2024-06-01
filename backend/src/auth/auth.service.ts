import { HttpStatus, Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { ConfirmCreateAuthDto, SignInDto, SignUpDto } from './dto';
import { AwsCognitoService } from './aws-cognito/aws-cognito.service';
import {
  AuthenticationResultType,
  GetUserCommandOutput,
  SignUpCommandOutput
} from '@aws-sdk/client-cognito-identity-provider';

@Injectable()
export class AuthService {
  constructor(private readonly cognito: AwsCognitoService) {}

  async create(signUpDto: SignUpDto): Promise<SignUpCommandOutput> {
    try {
      const response = await this.cognito.signUp(signUpDto);
      return response;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async get(signInDto: SignInDto): Promise<AuthenticationResultType> {
    try {
      const response = await this.cognito.signIn(signInDto);
      return response.AuthenticationResult;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async confirm(confirmCreateAuthDto: ConfirmCreateAuthDto): Promise<boolean> {
    const response = await this.cognito.signUpConfirm(confirmCreateAuthDto);
    return response.$metadata.httpStatusCode === HttpStatus.OK;
  }

  async me(acessToken: string): Promise<GetUserCommandOutput> {
    try {
      const response = await this.cognito.get(acessToken);
      return response;
    } catch (error) {
      throw new UnprocessableEntityException();
    }
  }
}
