import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { Response } from 'express';

import { CurrentUser } from '@oclio/common/auth';

import { RegisterUserCommand } from '../../application/users/commands/register/register-user.command';
import { RegisterUserResult } from '../../application/users/commands/register/register-user.result';
import { AuthenticateQuery } from '../../application/users/queries/authenticate/authenticate.query';
import { AuthenticateResult } from '../../application/users/queries/authenticate/authenticate.result';
import { UserBasic } from '../../shared/types';
import { AccessTokenGuard } from '../guards/access-token.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { SignInDto, SignUpDto } from './auth.dto';

@Controller({
  path: 'auth',
  version: '1',
})
@UseGuards(JwtAuthGuard)
export class AuthController {
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus,
  ) {}

  @Post('sign-up')
  async signUp(@Body() dto: SignUpDto, @Res() res: Response) {
    const { email, username, password } = dto;

    const result = await this._commandBus.execute<
      RegisterUserCommand,
      RegisterUserResult
    >(new RegisterUserCommand(email, username, password));

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
      .status(HttpStatus.OK)
      .send({ user: result.user });
  }

  @Post('sign-out')
  async signOut(@Res() res: Response) {
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

  @Get('check')
  async check(@CurrentUser() user: UserBasic, @Res() res: Response) {
    res.status(HttpStatus.OK).json({ isAuthenticated: user !== null, user });
  }
}
