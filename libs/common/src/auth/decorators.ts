import {
  ExecutionContext,
  SetMetadata,
  createParamDecorator,
} from '@nestjs/common';

import { ANONYMOUS_ACCESS } from '../constants';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().user;
  },
);

export const Anonymous = () => SetMetadata(ANONYMOUS_ACCESS, true);
