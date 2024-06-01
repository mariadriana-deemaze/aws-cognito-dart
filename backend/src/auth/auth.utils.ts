import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FastifyRequest } from 'fastify';
import { JwtPayload } from 'jsonwebtoken';

export type JWTClaims = Required<JwtPayload>;

export const getBearer = (request: FastifyRequest): string => {
  const bearer = request.headers.authorization?.split(' ').pop();
  if (!bearer) {
    throw new UnauthorizedException('Missing bearer token.');
  }
  return bearer;
};

export const decodeJWTClaims = (jwt: JwtService, acessToken: string): JWTClaims => {
  const payload: Partial<JwtPayload> = jwt.decode(acessToken);
  const requiredClaims: Array<keyof JWTClaims> = ['sub', 'jti'];
  const valid = payload && requiredClaims.every((claim) => claim in payload);
  if (!valid) {
    throw new UnauthorizedException('Invalid Access Token.');
  }
  return payload as JWTClaims;
};
