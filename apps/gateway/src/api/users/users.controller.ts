import { Body, Controller, Patch, UseGuards } from '@nestjs/common';

import { AccessTokenGuard, CurrentUser } from '@oclio/common/auth';

import { UsersService } from '../../application/services/users.service';
import { UserBasic, UserPreferences } from '../../shared/types';

@UseGuards(AccessTokenGuard)
@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  @Patch('preferences')
  async updatePreferences(
    @CurrentUser() user: UserBasic,
    @Body() preferences: UserPreferences,
  ) {
    const result = await this._usersService.updatePreferences(
      user.uid,
      preferences,
    );

    return result;
  }
}
