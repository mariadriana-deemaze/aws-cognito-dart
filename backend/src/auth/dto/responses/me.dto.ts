import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class MeResponse {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  verified: boolean;
}
