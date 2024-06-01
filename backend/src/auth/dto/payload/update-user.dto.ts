import { PartialType } from '@nestjs/mapped-types';
import { SignInDto } from './create-user.dto';

export class UpdateAuthDto extends PartialType(SignInDto) {}
