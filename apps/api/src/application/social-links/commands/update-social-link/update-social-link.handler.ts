import { CommandHandler, IQueryHandler } from '@nestjs/cqrs';

import { User } from '$core/user-aggregate/user.aggregate';

import { SocialLinksService } from '$application/services/social-links.service';
import { UsersService } from '$application/services/users.service';

import { UpdateSocialLinkCommand } from './update-social-link.command';

@CommandHandler(UpdateSocialLinkCommand)
export class UpdateSocialLinkHandler
  implements IQueryHandler<UpdateSocialLinkCommand>
{
  constructor(
    private readonly _socialLinksService: SocialLinksService,
    private readonly _usersServices: UsersService,
  ) {}

  async execute(command: UpdateSocialLinkCommand) {
    const { userId, socialLinkId, socialLinkUrl } = command;

    const userEntity = await this._usersServices.findOneById(userId);
    const user = User.fromPlain(userEntity);

    const result = user.updateSocialLink(socialLinkId, socialLinkUrl);
    if (result.isFailure()) {
      throw new Error(result.error);
    } else if (result.isSuccess()) {
      this._socialLinksService.update(result.value.id, {
        url: result.value.url,
      });
    }
  }
}
