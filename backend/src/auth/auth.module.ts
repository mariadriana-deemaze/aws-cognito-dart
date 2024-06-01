import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AwsCognitoModule } from './aws-cognito/aws-cognito.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({}), AwsCognitoModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule.register({})]
})
export class AuthModule {}
