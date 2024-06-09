import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { Observable } from 'rxjs';

import { ANONYMOUS_ACCESS } from '../constants';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const hasAnonymousAccess = this.reflector.getAllAndOverride<boolean>(
      ANONYMOUS_ACCESS,
      [context.getHandler(), context.getClass()],
    );
    if (hasAnonymousAccess) {
      return true;
    }

    return super.canActivate(context);
  }
}
