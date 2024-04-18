import { AggregateRoot } from '../shared-kernel/primitives/aggregate-root';
import { FullName } from './value-objects/full-name.vo';
import { SocialLink } from './social-link.model';
import { UniqueId } from '../shared-kernel/primitives/unique-id.vo';
import { Email } from './value-objects/email.vo';
import { HashedPassword } from './value-objects/hashed-password.vo';
import { Photo } from './photo.model';
import { SocialLinkType } from '../../common/enums';
import { DomainMessages } from '../shared-kernel/errors/domain.msg';
import { Result } from '../../common/result';
import { Expose, Transform, Type } from 'class-transformer';

export class User extends AggregateRoot {
  @Expose({ name: 'email' })
  @Transform(({ value }) => value.value)
  private _email: Email;

  @Expose({ name: 'fullName' })
  @Transform(({ value }) => value.value)
  private _fullName: FullName;

  @Expose({ name: 'hashedPassword' })
  @Transform(({ value }) => value.value)
  private _hashedPassword: HashedPassword;

  @Expose({ name: 'photo' })
  @Type(() => Photo)
  private _photo?: Photo;

  @Expose({ name: 'bio' })
  private _bio: string;

  @Expose({ name: 'socialLinks' })
  @Transform(({ value }) => (value.length === 0 ? undefined : value))
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

  addPhoto(base64: string): Result<never> {
    if (this._photo) {
      return Result.fail(DomainMessages.User.PhotoExists);
    }
    this._photo = Photo.create(base64);
  }

  removePhoto(): Result<never> {
    if (!this._photo) {
      return Result.fail(DomainMessages.User.PhotoNonExist);
    }
    this._photo = undefined;
  }

  addSocialLink(type: SocialLinkType, url: string): Result<never> {
    const existingLink = this._socialLinks.find((sl) => sl.type === type);
    if (existingLink) {
      return Result.fail(DomainMessages.User.SocialLinkAlreadyExists(type));
    }
    this._socialLinks.push(SocialLink.create(type, url));
  }

  updateSocialLink(existingLink: SocialLink, newUrl: string): Result<never> {
    const linkIndex = this._socialLinks.indexOf(existingLink);
    if (linkIndex === -1) {
      return Result.fail(DomainMessages.User.SocialLinkNotFound);
    }
    existingLink.updateUrl(newUrl);
  }

  removeSocialLink(linkToRemove: SocialLink): Result<never> {
    const index = this._socialLinks.indexOf(linkToRemove);
    if (index === -1) {
      return Result.fail(DomainMessages.User.SocialLinkNotFound);
    }
    this._socialLinks.splice(index, 1);
  }

  updateBio(newBio: string): void {
    this._bio = newBio;
  }
}
