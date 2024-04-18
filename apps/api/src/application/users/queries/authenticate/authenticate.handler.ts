import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UsersService } from '../../users.service';
import { SecurityService } from '../../../security/security.service';
import { JwtService } from '@nestjs/jwt';
import { AuthenticateQuery } from './authenticate.command';
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

    const token = await this._jwtService.sign({
      email: userEntity.email,
      sub: userEntity.id.toString(),
    });
    return new AuthenticateResult(token);
  }
}
