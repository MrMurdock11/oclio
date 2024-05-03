import { ICommand } from '@nestjs/cqrs';

export class RegisterUserCommand implements ICommand {
  constructor(
    public readonly email: string,
    public readonly fullName: string,
    public readonly password: string,
  ) {}
}
