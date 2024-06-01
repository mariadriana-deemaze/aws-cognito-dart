import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SignUpResponse {
  @Expose()
  success: boolean;

  @Expose()
  verified: boolean;
}
