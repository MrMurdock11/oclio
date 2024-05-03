import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';

import { SecurityService } from '../../../security/security.service';
import { UsersService } from '../../../services/users.service';
import { AuthenticateQuery } from './authenticate.query';
import { AuthenticateResult } from './authenticate.result';

@QueryHandler(AuthenticateQuery)
export class AuthenticateHandler implements IQueryHandler<AuthenticateQuery> {
  constructor(
    private readonly _usersService: UsersService,
    private readonly _securityService: SecurityService,
    private readonly _jwtService: JwtService,
  ) {}

  async execute(query: AuthenticateQuery): Promise<AuthenticateResult> {
    const { email, password } = query;

    const userEntity = await this._usersService.findOneByEmail(email);

    if (!userEntity) {
      throw new Error('User not found by email.');
    }

    if (
      !(await this._securityService.verifyPassword(
        password,
        userEntity.hashedPassword,
      ))
    ) {
      throw new Error('Invalid password.');
    }

    const token = await this._jwtService.signAsync({
      email: userEntity.email,
      sub: userEntity.id.toString(),
    });
    return new AuthenticateResult(token);
  }
}
