import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SignInResponse {
  @Expose()
  type: 'Bearer';

  @Expose()
  acessToken: string;

  @Expose()
  refreshToken: string;

  @Expose()
  expiresIn: string;
}
