import { IQuery } from '@nestjs/cqrs';

export class AuthenticateQuery implements IQuery {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}
