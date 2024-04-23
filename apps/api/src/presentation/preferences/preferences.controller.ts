import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { UpdatePreferencesCommand } from '$application/preferences/commands/update-preferences/update-preferences.command';
import { GetPreferencesQuery } from '$application/preferences/queries/get-preferences/get-preferences.query';

import { AccessTokenGuard } from '$presentation/guards/access-token.guard';

import { CurrentUser } from 'src/common/decorators';
import { ContextUser } from 'src/common/interfaces';

@Controller({
  path: 'preferences',
  version: '1',
})
@UseGuards(AccessTokenGuard)
export class PreferencesController {
  constructor(
    private readonly _queryBus: QueryBus,
    private readonly _commandBus: CommandBus,
  ) {}

  @Get()
  async get(@CurrentUser() user: ContextUser) {
    try {
      return await this._queryBus.execute(new GetPreferencesQuery(user.id));
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Put()
  async update(
    @CurrentUser() user: ContextUser,
    @Body() preferences: Record<string, string>,
  ) {
    try {
      await this._commandBus.execute(
        new UpdatePreferencesCommand(user.id, preferences),
      );
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
