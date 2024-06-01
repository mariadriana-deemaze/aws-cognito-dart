import {
  /*   AdminCreateUserCommand,
  AdminGetUserCommand, */
  CognitoIdentityProvider,
  GetUserCommand,
  SignUpCommand,
  InitiateAuthCommand,
  ConfirmSignUpCommand,
  InitiateAuthCommandOutput,
  GetUserCommandOutput,
  ConfirmSignUpCommandOutput,
  SignUpCommandOutput
} from '@aws-sdk/client-cognito-identity-provider';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfirmCreateAuthDto, SignInDto, SignUpDto } from '../dto';
import { createHmac } from 'crypto';

@Injectable()
export class AwsCognitoService {
  private readonly logger = new Logger(AwsCognitoService.name);
  private client: CognitoIdentityProvider;
  private credentials: {
    accessKeyId: string;
    secretAccessKey: string;
  };
  private pool: {
    id: string;
    region: string;
  };

  constructor(private readonly config: ConfigService) {
    this.credentials = {
      accessKeyId: this.config.getOrThrow('AWS_COGNITO_CLIENT_ID'),
      secretAccessKey: this.config.getOrThrow('AWS_COGNITO_CLIENT_SECRET')
    };
    this.pool = {
      id: this.config.getOrThrow('AWS_COGNITO_USER_POOL_ID'),
      region: this.config.getOrThrow('AWS_COGNITO_REGION')
    };
    this.client = new CognitoIdentityProvider({
      region: this.pool.region,
      credentials: this.credentials
    });
  }

  /**
   * Signs client secret access hash based on client app secrets and user email/username accessing the pool.
   * @async
   * @param {string} identifier
   * @returns {string}
   */
  private clientSecretHash(identifier: string): string {
    const hasher = createHmac('sha256', this.credentials.secretAccessKey);
    hasher.update(`${identifier}${this.credentials.accessKeyId}`);
    return hasher.digest('base64');
  }

  /**
   * Creates new user in the cognito user pool.
   * @async
   * @param {SignUpDto} SignUpDto
   * @returns {Promise<SignUpCommandOutput>}
   */
  async signUp({ email, password }: SignUpDto): Promise<SignUpCommandOutput> {
    const command = new SignUpCommand({
      ClientId: this.credentials.accessKeyId,
      Username: email,
      Password: password,
      SecretHash: this.clientSecretHash(email)
    });
    const res = await this.client.send(command);
    this.logger.log(res);
    return res;
  }

  /**
   * Confirms account email in user pool.
   * @async
   * @param {ConfirmCreateAuthDto} ConfirmCreateAuthDto
   * @returns {Promise<ConfirmSignUpCommandOutput>}
   */
  async signUpConfirm({ email, otp }: ConfirmCreateAuthDto): Promise<ConfirmSignUpCommandOutput> {
    const command = new ConfirmSignUpCommand({
      ClientId: this.credentials.accessKeyId,
      Username: email,
      ConfirmationCode: otp,
      SecretHash: this.clientSecretHash(email)
    });
    const res = await this.client.send(command);
    this.logger.log(res);
    return res;
  }

  /**
   * Grants new access credentials to the user.
   * @async
   * @param {SignInDto} signInDto
   * @returns {Promise<InitiateAuthCommandOutput>}
   */
  async signIn({ email, password }: SignInDto): Promise<InitiateAuthCommandOutput> {
    const command = new InitiateAuthCommand({
      ClientId: this.credentials.accessKeyId,
      AuthFlow: 'USER_PASSWORD_AUTH',
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
        SECRET_HASH: this.clientSecretHash(email)
      }
    });
    const res = await this.client.send(command);
    this.logger.log(res);
    return res;
  }

  /**
   * Get logged user information based on the signed access token claims.
   * @async
   * @param {string} accessToken
   * @returns {Promise<GetUserCommandOutput>}
   */
  async get(accessToken: string): Promise<GetUserCommandOutput> {
    const command = new GetUserCommand({
      AccessToken: accessToken
    });
    const res = await this.client.send(command);
    this.logger.log(res);
    return res;
  }
}
