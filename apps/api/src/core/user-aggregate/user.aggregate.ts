import {
  Photo as PrismaPhoto,
  SocialLink as PrismaSocialLink,
  User as PrismaUser,
} from '@prisma/client';
import { Expose, Transform, Type } from 'class-transformer';

import { SocialLinkType } from '../../common/enums';
import { Result } from '../../common/result';
import { DomainMessages } from '../shared-kernel/errors/domain.msg';
import { AggregateRoot } from '../shared-kernel/primitives/aggregate-root';
import { UniqueId } from '../shared-kernel/primitives/unique-id.vo';
import { Photo } from './photo.model';
import { SocialLink } from './social-link.model';
import { Email } from './value-objects/email.vo';
import { FullName } from './value-objects/full-name.vo';
import { HashedPassword } from './value-objects/hashed-password.vo';

export class User extends AggregateRoot {
  @Expose({ name: 'email' })
  @Transform(({ value }) => value.value, { toPlainOnly: true })
  private _email: Email;

  @Expose({ name: 'fullName' })
  @Transform(({ value }) => value.value, { toPlainOnly: true })
  private _fullName: FullName;

  @Expose({ name: 'hashedPassword' })
  @Transform(({ value }) => value.value, { toPlainOnly: true })
  private _hashedPassword: HashedPassword;

  @Expose({ name: 'photo' })
  @Type(() => Photo)
  private _photo?: Photo;

  @Expose({ name: 'bio' })
  private _bio: string;

  @Expose({ name: 'socialLinks' })
  @Transform(({ value }) => (value.length === 0 ? undefined : value), {
    toPlainOnly: true,
  })
  private _socialLinks: SocialLink[];

  private constructor(
    id: UniqueId,
    email: Email,
    fullName: FullName,
    hashedPassword: HashedPassword,
    photo?: Photo,
    bio?: string,
    socialLinks: SocialLink[] = [],
  ) {
    super(id);
    this._email = email;
    this._fullName = fullName;
    this._hashedPassword = hashedPassword;
    this._photo = photo;
    this._bio = bio;
    this._socialLinks = socialLinks;
  }

  // #region getters

  get email() {
    return this._email;
  }

  get photo() {
    return this._photo;
  }

  get fullName() {
    return this._fullName;
  }

  get bio() {
    return this._bio;
  }

  get hashedPassword() {
    return this._hashedPassword;
  }

  get socialLinks() {
    return this._socialLinks;
  }

  // #endregion

  static create(
    email: Email,
    fullName: FullName,
    hashedPassword: HashedPassword,
  ) {
    return new User(UniqueId.create(), email, fullName, hashedPassword);
  }

  addPhoto(file: Express.Multer.File): Result<never> {
    if (this._photo) {
      return Result.fail(DomainMessages.User.PhotoExists);
    }

    if (!file) {
      return Result.fail('File cannot be empty');
    }

    const base64 = file.buffer.toString('base64');
    this._photo = Photo.create(base64);
  }

  removePhoto(): Result<never> {
    if (!this._photo) {
      return Result.fail(DomainMessages.User.PhotoNonExist);
    }
    this._photo = undefined;
  }

  addSocialLink(type: SocialLinkType, url: string): Result<SocialLink> {
    const existingLink = this._socialLinks.find((sl) => sl.type === type);
    if (existingLink) {
      return Result.fail(DomainMessages.User.SocialLinkAlreadyExists(type));
    }

    const newSocialLink = SocialLink.create(type, url);
    this._socialLinks.push(newSocialLink);

    return Result.ok(newSocialLink);
  }

  updateSocialLink(id: bigint, newUrl: string): Result<SocialLink> {
    const socialLink = this._socialLinks.find((socialLink) =>
      socialLink.id.equals(UniqueId.create(id)),
    );

    if (!socialLink) {
      return Result.fail(DomainMessages.User.SocialLinkNotFound);
    }

    socialLink.updateUrl(newUrl);
    return Result.ok(socialLink);
  }

  removeSocialLink(socialLinkId: bigint): Result<SocialLink> {
    const index = this._socialLinks.findIndex((socialLink) =>
      socialLink.id.equals(UniqueId.create(socialLinkId)),
    );
    if (index === -1) {
      return Result.fail(DomainMessages.User.SocialLinkNotFound);
    }

    const socialLink = this._socialLinks[index];
    delete this._socialLinks[index];

    return Result.ok(socialLink);
  }

  updateBio(newBio: string): void {
    this._bio = newBio;
  }

  static fromPlain(
    plainObject: PrismaUser & { photo: PrismaPhoto } & {
      socialLinks: PrismaSocialLink[];
    },
  ): User {
    const { id, email, fullName, hashedPassword, photo, bio, socialLinks } =
      plainObject;

    return new User(
      UniqueId.create(id),
      Email.create(email),
      FullName.create(fullName),
      HashedPassword.create(hashedPassword),
      photo ? Photo.fromPlain(photo) : undefined,
      bio,
      socialLinks ? socialLinks.map(SocialLink.fromPlain) : undefined,
    );
  }
}
