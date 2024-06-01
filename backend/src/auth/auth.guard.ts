import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { decodeJWTClaims, getBearer } from './auth.utils';

export const IS_PUBLIC_KEY = 'isPublic';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (isPublic) {
      return true;
    }

    try {
      const request: FastifyRequest & { accountId: string } = context.switchToHttp().getRequest();
      const token = getBearer(request);
      const { sub: accountId } = decodeJWTClaims(this.jwtService, token);
      request.accountId = accountId;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
