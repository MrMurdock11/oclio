import { ICommand } from '@nestjs/cqrs';

export class RegisterUserCommand implements ICommand {
  constructor(
    public readonly email: string,
    public readonly username: string,
    public readonly password: string,
  ) {}
}
