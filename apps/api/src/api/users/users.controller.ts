import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

@Controller({
  version: '1',
  path: 'users',
})
export class UsersController {
  constructor(private readonly commandBus: CommandBus) {}
}
