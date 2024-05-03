import { Injectable } from '@nestjs/common';

import { Photo, Prisma, SocialLink, User } from '@prisma/client';

import { PrismaService } from '../../persistence/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly _prismaService: PrismaService) {}

  async findOneById(
    id: bigint,
  ): Promise<(User & { photo: Photo } & { socialLinks: SocialLink[] }) | null> {
    return this._prismaService.user.findUnique({
      where: { id },
      include: {
        photo: true,
        socialLinks: true,
      },
    });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this._prismaService.user.findUnique({ where: { email } });
  }

  async findAll(params: Prisma.UserFindManyArgs): Promise<User[]> {
    return this._prismaService.user.findMany(params);
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this._prismaService.user.create({
      data,
    });
  }

  async update(id: bigint, data: Prisma.UserUpdateInput): Promise<User> {
    return this._prismaService.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<User> {
    return this._prismaService.user.delete({
      where: { id },
    });
  }
}
