import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/payload/create-user.dto';
import { UpdateAuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createAuthDto: CreateAuthDto): string {
    return this.authService.create(createAuthDto);
  }

  @Get()
  findAll(): string {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto): string {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    return this.authService.remove(+id);
  }
}
