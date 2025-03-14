import {
  ExecutionContext,
  SetMetadata,
  createParamDecorator,
} from '@nestjs/common';

import { ANONYMOUS_ACCESS } from '../constants';

export const CurrentUser = createParamDecorator(
  async (
    data: keyof { email: string; uid: string } | undefined,
    ctx: ExecutionContext,
  ) => {
    const request = ctx.switchToHttp().getRequest();

    try {
      return request.user;
    } catch (error) {
      return null;
    }
  },
);

export const Anonymous = () => SetMetadata(ANONYMOUS_ACCESS, true);
