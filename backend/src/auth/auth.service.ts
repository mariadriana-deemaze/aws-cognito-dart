import { Injectable } from '@nestjs/common';
import { CreateAuthDto, UpdateAuthDto } from './dto';

@Injectable()
export class AuthService {
  create(createAuthDto: CreateAuthDto): string {
    return `This action adds a new auth ${JSON.stringify(createAuthDto)}`;
  }

  findAll(): string {
    return `This action returns all auth`;
  }

  findOne(id: number): string {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto): string {
    return `This action updates a #${id} auth ${JSON.stringify(updateAuthDto)}`;
  }

  remove(id: number): string {
    return `This action removes a #${id} auth`;
  }
}
