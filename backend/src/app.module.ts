import { Module } from '@nestjs/common';
import { validate } from 'class-validator';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import PinoLoggerConfig from './config/pino.config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
const customDBValidators = [];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [],
      validate
    }),
    LoggerModule.forRoot(PinoLoggerConfig),
    AuthModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    ...customDBValidators
  ]
})
export class AppModule {}
