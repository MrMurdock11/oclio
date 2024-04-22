import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UsersService } from '../../../services/users.service';
import { UpdateInfoCommand } from './update-info.command';

@CommandHandler(UpdateInfoCommand)
export class UpdateInfoHandler implements ICommandHandler<UpdateInfoCommand> {
  constructor(private readonly _usersService: UsersService) {}

  async execute(command: UpdateInfoCommand): Promise<void> {
    const { userId, fullName, bio } = command;

    await this._usersService.update(userId, { fullName, bio });
  }
}
