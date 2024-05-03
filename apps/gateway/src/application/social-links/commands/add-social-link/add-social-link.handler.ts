import { CommandHandler, IQueryHandler } from '@nestjs/cqrs';

import { User } from '../../../../core/user-aggregate/user.aggregate';

import { UsersService } from '../../../services/users.service';

import { SocialLinksService } from '../../../services/social-links.service';
import { AddSocialLinkCommand } from './add-social-link.command';

@CommandHandler(AddSocialLinkCommand)
export class AddSocialLinkHandler
  implements IQueryHandler<AddSocialLinkCommand>
{
  constructor(
    private readonly _socialLinksService: SocialLinksService,
    private readonly _usersServices: UsersService,
  ) {}

  async execute(command: AddSocialLinkCommand) {
    const { userId, socialLinkType, socialLinkUrl } = command;

    const userEntity = await this._usersServices.findOneById(userId);
    const user = User.fromPlain(userEntity);

    const result = user.addSocialLink(socialLinkType, socialLinkUrl);
    if (result.isFailure()) {
      throw new Error(result.error);
    } else if (result.isSuccess()) {
      this._socialLinksService.create({
        typeId: result.value.type as number,
        url: result.value.url,
        userId: user.id,
      });
    }
  }
}
