import { Injectable } from '@nestjs/common';

import { Prisma, User as UserEntity } from '@prisma/client';

import { PrismaService } from '../../persistence/prisma/prisma.service';
import { UserBasic, UserPreferences } from '../../shared/types';

@Injectable()
export class UsersService {
  constructor(private readonly _prismaService: PrismaService) {}

  async findOneById(id: bigint): Promise<UserEntity | null> {
    return this._prismaService.user.findUnique({
      where: { id },
    });
  }

  async findOneByUid(uid: string): Promise<UserBasic | null> {
    const userEntity = await this._prismaService.user.findUnique({
      where: { uid },
    });

    if (!userEntity) return null;

    return {
      uid: userEntity.uid,
      email: userEntity.email,
      username: userEntity.username,
      fullName: userEntity.fullName,
      preferences: {
        theme: userEntity.preferences['theme'] as 'light' | 'dark',
      },
    };
  }

  async findOneByEmail(email: string): Promise<UserEntity | null> {
    return this._prismaService.user.findUnique({ where: { email } });
  }

  async findAll(params: Prisma.UserFindManyArgs): Promise<UserEntity[]> {
    return this._prismaService.user.findMany(params);
  }

  async create(data: Prisma.UserCreateInput): Promise<UserEntity> {
    return this._prismaService.user.create({
      data,
    });
  }

  async update(id: bigint, data: Prisma.UserUpdateInput): Promise<UserEntity> {
    return this._prismaService.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: bigint): Promise<UserEntity> {
    return this._prismaService.user.delete({
      where: { id },
    });
  }

  async updatePreferences(
    uid: string,
    preferences: UserPreferences,
  ): Promise<UserPreferences> {
    const result = await this._prismaService.user.update({
      where: { uid },
      data: { preferences },
    });

    return result.preferences as UserPreferences;
  }
}
