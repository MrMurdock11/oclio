import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';

import { Observable, map } from 'rxjs';

import { RpcResult } from '@oclio/common/results';

export class RpcResultInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((response) => {
        return response instanceof RpcResult ? response.toJson() : response;
      }),
    );
  }
}
