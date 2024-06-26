import { SocialLink as SocialLinkPrisma } from '@prisma/client';
import { Expose } from 'class-transformer';

import { SocialLinkType } from '../../common/enums';
import { Result } from '../../common/result';
import { DomainMessages } from '../shared-kernel/errors/domain.msg';
import { Entity } from '../shared-kernel/primitives/entity';

export class SocialLink extends Entity {
  @Expose({ name: 'type' })
  private _type: SocialLinkType;

  @Expose({ name: 'url' })
  private _url: string;

  private constructor(id: bigint, type: SocialLinkType, url: string) {
    super(id);
    this._type = type;
    this._url = url;
  }

  // #region getter

  get type() {
    return this._type;
  }

  get url() {
    return this._url;
  }

  // #endregion

  static create(type: SocialLinkType, url: string): Result<SocialLink> {
    if (!this.isValidUrl(url, type)) {
      Result.fail(DomainMessages.SocialLink.InvalidUrl(type));
    }

    return Result.ok(new SocialLink(undefined, type, url));
  }

  static fromPlain(plainObject: SocialLinkPrisma): SocialLink {
    const { id, typeId, url } = plainObject;

    return new SocialLink(id, typeId, url);
  }

  updateUrl(url: string): Result<never> {
    if (!SocialLink.isValidUrl(url, this._type)) {
      return Result.fail(DomainMessages.SocialLink.InvalidUrl(this._type));
    }

    this._url = url;
  }

  private static isValidUrl(
    url: string,
    type: SocialLinkType,
  ): Result<boolean> {
    const validationRules: { [key in SocialLinkType]: string } = {
      [SocialLinkType.Facebook]:
        '^(https?://)?(www.)?facebook.com/[a-zA-Z0-9(.?)?]',
      [SocialLinkType.Twitter]:
        '^(https?://)?(www.)?twitter.com/[a-zA-Z0-9(.?)?]',
      [SocialLinkType.Instagram]:
        '^(https?://)?(www.)?instagram.com/[a-zA-Z0-9(.?)?]',
      [SocialLinkType.Telegram]:
        '^(https?://)?(www.)?(t.me|telegram.me)/[a-zA-Z0-9_]{5,}$',
      [SocialLinkType.TikTok]:
        '^(https?://)?(www.)?tiktok.com/(@[a-zA-Z0-9._]+)$',
      [SocialLinkType.YouTube]:
        '^(https?://)?(www.)?youtube.com/(watch?v=|channel/|user/)[^/s]+$',
    };

    const pattern = validationRules[type];
    if (!pattern) {
      return Result.fail(
        DomainMessages.SocialLink.ValidationRuleNotDefined(type),
      );
    }

    const isValid = new RegExp(pattern).test(url);
    return isValid
      ? Result.ok(true)
      : Result.fail(DomainMessages.SocialLink.InvalidUrl(type));
  }
}
