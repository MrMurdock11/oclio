import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { SocialLinkType } from '../../../../common/enums';
import { SocialLinkTypesDictionary } from '../../../../common/interfaces';

import { GetSocialLinkTypesQuery } from './social-link-types.query';

@QueryHandler(GetSocialLinkTypesQuery)
export class GetSocialLinkTypesHandler implements IQueryHandler {
  execute(): Promise<SocialLinkTypesDictionary> {
    const socialLinkTypeMap: SocialLinkTypesDictionary = {};

    for (const socialLinkType in SocialLinkType) {
      if (typeof SocialLinkType[socialLinkType] === 'number') {
        socialLinkTypeMap[SocialLinkType[socialLinkType]] = socialLinkType;
      }
    }

    return Promise.resolve(socialLinkTypeMap);
  }
}
