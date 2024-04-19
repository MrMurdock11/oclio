import { Injectable } from '@nestjs/common';

import { Prisma, User } from '@prisma/client';

import { UsersRepository } from '../../core/user-aggregate/user.repository';
import { PrismaService } from '../../persistence/prisma/prisma.service';

@Injectable()
export class UsersService implements UsersRepository {
  constructor(private prismaService: PrismaService) {}

  async findOneById(id: number): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  async findAll(params: Prisma.UserFindManyArgs): Promise<User[]> {
    return this.prismaService.user.findMany(params);
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prismaService.user.create({
      data,
    });
  }

  async update(id: bigint, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prismaService.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<User> {
    return this.prismaService.user.delete({
      where: { id },
    });
  }
}
