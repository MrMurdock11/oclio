import { Injectable } from '@nestjs/common';

import { Photo, Prisma } from '@prisma/client';

import { PrismaService } from '$persistence/prisma/prisma.service';

@Injectable()
export class PhotosService {
  constructor(private prismaService: PrismaService) {}

  async findOneById(id: bigint): Promise<Photo | null> {
    return this.prismaService.photo.findUnique({
      where: { id },
    });
  }

  async findAll(params: Prisma.PhotoFindManyArgs): Promise<Photo[]> {
    return this.prismaService.photo.findMany(params);
  }

  async create(
    data: Prisma.PhotoCreateInput | Prisma.PhotoUncheckedCreateInput,
  ): Promise<Photo> {
    return this.prismaService.photo.create({
      data,
    });
  }

  async update(id: bigint, data: Prisma.PhotoUpdateInput): Promise<Photo> {
    return this.prismaService.photo.update({
      where: { id },
      data,
    });
  }

  async delete(id: bigint): Promise<Photo> {
    return this.prismaService.photo.delete({
      where: { id },
    });
  }

  async deleteByUserId(userId: bigint): Promise<Photo> {
    return this.prismaService.photo.delete({
      where: { userId },
    });
  }
}
