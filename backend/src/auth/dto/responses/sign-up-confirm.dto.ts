import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SignUpConfirmResponse {
  @Expose()
  success: boolean;
}
