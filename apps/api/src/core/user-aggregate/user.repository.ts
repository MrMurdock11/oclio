import { Prisma, User } from '@prisma/client';

export interface UsersRepository {
  findOneById(id: number): Promise<User | null>;
  findAll(params: Prisma.UserFindManyArgs): Promise<User[]>;
  create(data: Prisma.UserCreateInput): Promise<User>;
  update(id: bigint, data: Prisma.UserUpdateInput): Promise<User>;
  delete(id: number): Promise<User>;
}
