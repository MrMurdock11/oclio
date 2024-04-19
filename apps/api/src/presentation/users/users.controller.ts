import {
  Body,
  Controller,
  InternalServerErrorException,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { UpdateInfoCommand } from '$application/users/commands/update-info/update-info.command';

import { CurrentUser } from 'src/common/decorators';
import { ContextUser } from 'src/common/interfaces';

import { AccessTokenGuard } from '../guards/access-token.guard';
import { UpdateInfoDto } from './dtos/update-info.dto';

@Controller({
  version: '1',
  path: 'users',
})
export class UsersController {
  constructor(private readonly _commandBus: CommandBus) {}

  @UseGuards(AccessTokenGuard)
  @Put('info')
  updateInfo(@Body() dto: UpdateInfoDto, @CurrentUser() user: ContextUser) {
    const { fullName, bio } = dto;

    try {
      const command = new UpdateInfoCommand(BigInt(user.id), fullName, bio);
      this._commandBus.execute(command);
    } catch (err) {
      throw new InternalServerErrorException(
        'An error occurred while processing your request.',
      );
    }
  }
}
