import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetAccount = createParamDecorator((_data: string | undefined, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.accountId;
});
