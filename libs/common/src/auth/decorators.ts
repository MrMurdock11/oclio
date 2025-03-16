import {
  ExecutionContext,
  SetMetadata,
  createParamDecorator,
} from '@nestjs/common';

import { ANONYMOUS_ACCESS } from '../constants';

export const CurrentUser = createParamDecorator(
  async (
    data: keyof { email: string; uid: string } | null,
    ctx: ExecutionContext,
  ) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export const Anonymous = () => SetMetadata(ANONYMOUS_ACCESS, true);
