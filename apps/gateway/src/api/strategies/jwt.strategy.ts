import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ContextUser } from '../../shared/interfaces';
import { JwtPayload } from './payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
      ]),
      // passReqToCallback: true,
      ignoreExpiration: false,
      secretOrKey: process.env.TOKEN_KEY,
    });
  }

  async validate(payload: JwtPayload): Promise<ContextUser> {
    return { id: BigInt(payload.sub), email: payload.email };
  }
}
