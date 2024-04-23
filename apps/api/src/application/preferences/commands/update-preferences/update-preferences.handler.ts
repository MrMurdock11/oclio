import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { instanceToPlain } from 'class-transformer';

import { User } from '$core/user-aggregate/user.aggregate';

import { UsersService } from '$application/services/users.service';

import { UpdatePreferencesCommand } from './update-preferences.command';

@CommandHandler(UpdatePreferencesCommand)
export class UpdatePreferencesHandler
  implements ICommandHandler<UpdatePreferencesCommand>
{
  constructor(private readonly _usersService: UsersService) {}

  async execute(command: UpdatePreferencesCommand): Promise<void> {
    const { userId, preferences } = command;

    const user = User.fromPlain(await this._usersService.findOneById(userId));
    user.updatePreferences(preferences);

    const userEntity = instanceToPlain(user);
    await this._usersService.update(userId, userEntity);
  }
}
