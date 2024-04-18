import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegisterUserCommand } from 'src/application/users/commands/register/register-user.command';
import { SignUpDto } from './sign-up.dto';
import { Response } from 'express';
import { RegisterUserResult } from 'src/application/users/commands/register/register-user.result';
import { SignInDto } from './sign-in.dto';
import { AuthenticateQuery } from 'src/application/users/queries/authenticate/authenticate.command';
import { AuthenticateResult } from 'src/application/users/queries/authenticate/authenticate.result';

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
}
