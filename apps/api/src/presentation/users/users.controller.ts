import { Controller, Get, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AccessTokenGuard } from '../guards/access-token.guard';

@Controller({
  version: '1',
  path: 'users',
})
export class UsersController {
  constructor(private readonly commandBus: CommandBus) {}

  @UseGuards(AccessTokenGuard)
  @Get()
  get() {
    return 'fuck';
  }
}
