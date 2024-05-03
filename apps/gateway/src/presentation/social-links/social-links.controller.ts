import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { instanceToPlain } from 'class-transformer';

import { AddSocialLinkCommand } from '../../application/social-links/commands/add-social-link/add-social-link.command';
import { RemoveSocialLinkCommand } from '../../application/social-links/commands/remove-social-link/remove-social-link.command';
import { UpdateSocialLinkCommand } from '../../application/social-links/commands/update-social-link/update-social-link.command';
import { GetSocialLinksQuery } from '../../application/social-links/queries/get-social-links/get-social-links.query';
import { GetSocialLinksResult } from '../../application/social-links/queries/get-social-links/get-social-links.result';

import { CurrentUser } from '../../common/decorators';
import { ContextUser } from '../../common/interfaces';

import { AccessTokenGuard } from '../guards/access-token.guard';
import { AddSocialLinkDto } from './dtos/add-social-link.dto';
import { UpdateSocialLinkDto } from './dtos/update-social-link.dto';

@UseGuards(AccessTokenGuard)
@Controller({
  path: 'social-links',
  version: '1',
})
export class SocialLinksController {
  constructor(
    private readonly _queryBus: QueryBus,
    private readonly _commandBus: CommandBus,
  ) {}

  @Get()
  async get(@CurrentUser() user: ContextUser) {
    try {
      const result = await this._queryBus.execute<
        GetSocialLinksQuery,
        GetSocialLinksResult
      >(new GetSocialLinksQuery(BigInt(user.id)));

      return instanceToPlain(result.socialLinks);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Post()
  async add(@Body() dto: AddSocialLinkDto, @CurrentUser() user: ContextUser) {
    const { type, url } = dto;
    try {
      await this._commandBus.execute(
        new AddSocialLinkCommand(BigInt(user.id), type, url),
      );
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateSocialLinkDto,
    @CurrentUser() user: ContextUser,
  ) {
    const { url } = dto;

    try {
      await this._commandBus.execute(
        new UpdateSocialLinkCommand(BigInt(user.id), BigInt(id), url),
      );
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @CurrentUser() user: ContextUser) {
    try {
      await this._commandBus.execute(
        new RemoveSocialLinkCommand(BigInt(user.id), BigInt(id)),
      );
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
