import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { Response } from 'express';

import { RegisterUserCommand } from '../../application/users/commands/register/register-user.command';
import { RegisterUserResult } from '../../application/users/commands/register/register-user.result';
import { AuthenticateQuery } from '../../application/users/queries/authenticate/authenticate.query';
import { AuthenticateResult } from '../../application/users/queries/authenticate/authenticate.result';

import { AccessTokenGuard } from '../guards/access-token.guard';
import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus,
  ) {}

  @Post('sign-up')
  async signUp(@Body() dto: SignUpDto, @Res() res: Response) {
    const { email, fullName, password } = dto;

    const result = await this._commandBus.execute<
      RegisterUserCommand,
      RegisterUserResult
    >(new RegisterUserCommand(email, fullName, password));

    res
      .cookie('Authentication', result.token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      })
      .status(HttpStatus.CREATED)
      .send('You signed up successfully.');
  }

  @Post('sign-in')
  async signIn(@Body() dto: SignInDto, @Res() res: Response) {
    const { email, password } = dto;

    const result = await this._queryBus.execute<
      AuthenticateQuery,
      AuthenticateResult
    >(new AuthenticateQuery(email, password));

    res
      .cookie('Authentication', result.token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      })
      .status(HttpStatus.NO_CONTENT)
      .send();
  }

  @UseGuards(AccessTokenGuard)
  @Post('logout')
  async logout(@Res() res: Response) {
    // Set the cookie's expiration date to a past time to invalidate it
    res
      .cookie('Authentication', '', {
        httpOnly: true,
        expires: new Date(0),
      })
      .status(HttpStatus.OK)
      .json({
        message: 'Logout successful',
      });
  }
}
