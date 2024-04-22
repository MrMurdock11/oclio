import {
  Controller,
  Get,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { GetSocialLinkTypesQuery } from '$application/social-link-types/queries/get-social-link-types/social-link-types.query';

import { SocialLinkTypesDictionary } from 'src/common/interfaces';

import { AccessTokenGuard } from '../guards/access-token.guard';

@Controller({
  path: 'social-link-types',
  version: '1',
})
@UseGuards(AccessTokenGuard)
export class SocialLinkTypesController {
  constructor(private readonly _queryBus: QueryBus) {}

  @Get()
  async get(): Promise<SocialLinkTypesDictionary> {
    try {
      return await this._queryBus.execute<
        GetSocialLinkTypesQuery,
        SocialLinkTypesDictionary
      >(new GetSocialLinkTypesQuery());
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
