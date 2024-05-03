import { Injectable } from '@nestjs/common';

import { Prisma, SocialLink } from '@prisma/client';

import { PrismaService } from '../../persistence/prisma/prisma.service';

@Injectable()
export class SocialLinksService {
  constructor(private readonly _prismaService: PrismaService) {}

  async findOneById(id: bigint): Promise<SocialLink | null> {
    return this._prismaService.socialLink.findUnique({
      where: { id },
    });
  }

  async findAll(params: Prisma.SocialLinkFindManyArgs): Promise<SocialLink[]> {
    return this._prismaService.socialLink.findMany(params);
  }

  async create(
    data: Prisma.SocialLinkCreateInput | Prisma.SocialLinkUncheckedCreateInput,
  ): Promise<SocialLink> {
    return this._prismaService.socialLink.create({
      data,
    });
  }

  async update(
    id: bigint,
    data: Prisma.SocialLinkUpdateInput,
  ): Promise<SocialLink> {
    return this._prismaService.socialLink.update({
      where: { id },
      data,
    });
  }

  async delete(id: bigint): Promise<SocialLink> {
    return this._prismaService.socialLink.delete({
      where: { id },
    });
  }
}
