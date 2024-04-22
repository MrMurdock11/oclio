import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { SocialLink } from '$core/user-aggregate/social-link.model';

import { SocialLinksService } from '../../../services/social-links.service';
import { GetSocialLinksQuery } from './get-social-links.query';
import { GetSocialLinksResult } from './get-social-links.result';

@QueryHandler(GetSocialLinksQuery)
export class GetSocialLinksHandler
  implements IQueryHandler<GetSocialLinksQuery>
{
  constructor(private readonly _socialLinksService: SocialLinksService) {}

  async execute(query: GetSocialLinksQuery): Promise<GetSocialLinksResult> {
    const { userId } = query;
    const socialLinkEntities = await this._socialLinksService.findAll({
      where: { userId },
    });

    const socialLinks = socialLinkEntities.map(SocialLink.fromPlain);
    return new GetSocialLinksResult(socialLinks);
  }
}
