import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ContextUser } from '../../shared/interfaces';
import { JwtPayload } from './payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _configService: ConfigService) {
    const tokenKey = _configService.get<string>('JWT_SECRET');
    const expiresIn = _configService.get<string>('JWT_EXPIRES_IN');
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: tokenKey,
      signOptions: { expiresIn },
    });
  }

  async validate(payload: JwtPayload): Promise<ContextUser> {
    if (!payload) {
      throw new UnauthorizedException();
    }
    return payload as ContextUser;
  }
}
