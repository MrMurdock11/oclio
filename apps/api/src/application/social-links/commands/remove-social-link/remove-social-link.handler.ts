import { CommandHandler, IQueryHandler } from '@nestjs/cqrs';

import { User } from '$core/user-aggregate/user.aggregate';

import { SocialLinksService } from '../../../services/social-links.service';
import { UsersService } from '../../../services/users.service';
import { RemoveSocialLinkCommand } from './remove-social-link.command';

@CommandHandler(RemoveSocialLinkCommand)
export class RemoveSocialLinkHandler
  implements IQueryHandler<RemoveSocialLinkCommand>
{
  constructor(
    private readonly _socialLinksService: SocialLinksService,
    private readonly _usersServices: UsersService,
  ) {}

  async execute(command: RemoveSocialLinkCommand) {
    const { userId, socialLinkId } = command;

    const userEntity = await this._usersServices.findOneById(userId);
    const user = User.fromPlain(userEntity);

    const result = user.removeSocialLink(socialLinkId);
    if (result.isFailure()) {
      throw new Error(result.error);
    } else if (result.isSuccess()) {
      this._socialLinksService.delete(result.value.id.value);
    }
  }
}
