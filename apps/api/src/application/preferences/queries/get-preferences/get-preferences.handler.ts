import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { User } from '$core/user-aggregate/user.aggregate';

import { UsersService } from '$application/services/users.service';

import { GetPreferencesQuery } from './get-preferences.query';

@QueryHandler(GetPreferencesQuery)
export class GetPreferencesHandler
  implements IQueryHandler<GetPreferencesQuery>
{
  constructor(private readonly _usersService: UsersService) {}

  async execute(query: GetPreferencesQuery): Promise<Record<string, string>> {
    const { userId } = query;

    const user = User.fromPlain(await this._usersService.findOneById(userId));

    return user.preferences.value;
  }
}
