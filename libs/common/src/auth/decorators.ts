import {
  ExecutionContext,
  SetMetadata,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ANONYMOUS_ACCESS } from '../constants';

export const CurrentUser = createParamDecorator(
  async (
    data: keyof { email: string; uid: string } | undefined,
    ctx: ExecutionContext,
  ) => {
    const request = ctx.switchToHttp().getRequest();
    const token = request.cookies?.Authentication;

    if (!token) {
      return null;
    }

    const jwtService = request.jwtService as JwtService;

    try {
      const decoded = jwtService.verify<{ email: string; uid: string }>(token);
      return data ? decoded[data] : decoded;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  },
);

export const Anonymous = () => SetMetadata(ANONYMOUS_ACCESS, true);
