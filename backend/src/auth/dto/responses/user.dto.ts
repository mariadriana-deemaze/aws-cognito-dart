import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserResponse {
  @Expose()
  id: string;

  @Expose()
  username: string;
}
