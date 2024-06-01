import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { getBearer } from 'src/auth/auth.utils';

export const GetBearerToken = createParamDecorator((_data: string | undefined, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const token = getBearer(request);
  return token;
});
