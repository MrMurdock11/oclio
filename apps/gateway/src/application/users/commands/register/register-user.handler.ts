import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';

import { Prisma } from '@prisma/client';
import { Username } from 'apps/gateway/src/core/user-aggregate/value-objects/username.vo';
import { instanceToPlain } from 'class-transformer';

import { User } from '../../../../core/user-aggregate/user.aggregate';
import { Email } from '../../../../core/user-aggregate/value-objects/email.vo';
import { FullName } from '../../../../core/user-aggregate/value-objects/full-name.vo';
import { HashedPassword } from '../../../../core/user-aggregate/value-objects/hashed-password.vo';
import { SecurityService } from '../../../security/security.service';
import { UsersService } from '../../../services/users.service';
import { RegisterUserCommand } from './register-user.command';
import { RegisterUserResult } from './register-user.result';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler
  implements ICommandHandler<RegisterUserCommand>
{
  constructor(
    private readonly _usersService: UsersService,
    private readonly _securityService: SecurityService,
    private readonly _jwtService: JwtService,
  ) {}

  async execute(command: RegisterUserCommand): Promise<RegisterUserResult> {
    const { email, username, password } = command;

    const hashedPassword = await this._securityService.hashPassword(password);
    const user = User.create(
      Email.create(email),
      Username.create(username),
      HashedPassword.create(hashedPassword),
    );

    const userEntity = instanceToPlain(user, {
      excludeExtraneousValues: true,
    }) as Prisma.UserCreateInput;
    const createdUser = await this._usersService.create(userEntity);

    const token = await this._jwtService.signAsync({
      email: createdUser.email,
      sub: createdUser.id.toString(),
    });
    return new RegisterUserResult(token);
  }
}
