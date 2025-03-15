import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { SignInDto, SignUpDto } from '@gateway/api/auth/auth.dto';
import { UsersService } from '@gateway/application/services/users.service';
import { User } from '@gateway/core/user-aggregate/user.aggregate';
import { Email } from '@gateway/core/user-aggregate/value-objects/email.vo';
import { HashedPassword } from '@gateway/core/user-aggregate/value-objects/hashed-password.vo';
import { Username } from '@gateway/core/user-aggregate/value-objects/username.vo';
import { UserBasic } from '@gateway/shared/types';
import { Prisma } from '@prisma/client';
import { instanceToPlain } from 'class-transformer';
import { Response } from 'express';

import { SecurityService } from '../security/security.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly _usersService: UsersService,
    private readonly _securityService: SecurityService,
    private readonly _jwtService: JwtService,
  ) {}

  async register(dto: SignUpDto) {
    const { email, username, password } = dto;

    const hashedPassword = await this._securityService.hashPassword(password);
    const user = User.create(
      Email.create(email),
      Username.create(username),
      HashedPassword.create(hashedPassword),
    );

    const userEntity = instanceToPlain(user, {
      excludeExtraneousValues: true,
    }) as Prisma.UserCreateInput;
    const createdUser = await this._usersService.create(userEntity);

    const token = await this._jwtService.signAsync({
      email: createdUser.email,
      uid: createdUser.uid.toString(),
    });

    return {
      message: 'Registration successful',
      token,
    };
  }

  async login(dto: SignInDto, res: Response) {
    const { email, password } = dto;

    const userEntity = await this._usersService.findOneByEmail(email);

    if (!userEntity) {
      throw new Error('User not found by email.');
    }

    if (
      !(await this._securityService.verifyPassword(
        password,
        userEntity.hashedPassword,
      ))
    ) {
      throw new Error('Invalid password.');
    }

    const token = await this._jwtService.signAsync({
      email: userEntity.email,
      uid: userEntity.uid.toString(),
    });
    const user = User.fromPlain(userEntity);

    res.cookie('Authentication', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    return {
      message: 'Login successful',
      user: user.toBasic(),
    };
  }

  async logout(res: Response) {
    res.cookie('Authentication', '', {
      httpOnly: true,
      expires: new Date(0),
    });

    return { message: 'Logout successful' };
  }

  async getProfile(user: UserBasic | null) {
    if (!user) {
      return { isAuthenticated: false, user: null };
    }

    const userBasic = await this._usersService.findOneByUid(user.uid);
    return { isAuthenticated: Boolean(userBasic), user: userBasic };
  }
}
