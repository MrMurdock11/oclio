import { User as PrismaUser } from '@prisma/client';
import { Expose, Transform } from 'class-transformer';

import { AggregateRoot } from '@oclio/common';

import { DEFAULT_USER_PREFERENCES } from '../../shared/constants';
import { UserBasic } from '../../shared/types';
import { Email } from './value-objects/email.vo';
import { FullName } from './value-objects/full-name.vo';
import { HashedPassword } from './value-objects/hashed-password.vo';
import { Preferences } from './value-objects/preferences.vo';
import { Username } from './value-objects/username.vo';

export class User extends AggregateRoot<bigint> {
  @Expose({ name: 'email' })
  @Transform(({ value }) => value.value, { toPlainOnly: true })
  private _email: Email;

  @Expose({ name: 'username' })
  @Transform(({ value }) => value.value, { toPlainOnly: true })
  private _username: Username;

  @Expose({ name: 'fullName' })
  @Transform(({ value }) => value.value, { toPlainOnly: true })
  private _fullName: FullName;

  @Expose({ name: 'hashedPassword' })
  @Transform(({ value }) => value.value, { toPlainOnly: true })
  private _hashedPassword: HashedPassword;

  @Expose({ name: 'bio' })
  private _bio: string;

  @Expose({ name: 'preferences' })
  @Transform(({ value }) => value.value)
  private _preferences: Preferences;

  private constructor(
    id: bigint,
    uid: string,
    email: Email,
    username: Username,
    fullName: FullName,
    hashedPassword: HashedPassword,
    bio?: string,
    preferences?: Preferences,
  ) {
    super(id, uid);
    this._email = email;
    this._username = username;
    this._fullName = fullName;
    this._hashedPassword = hashedPassword;
    this._bio = bio;
    this._preferences = preferences;
  }

  // #region getters

  get email() {
    return this._email;
  }

  get username() {
    return this._username;
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

  get preferences() {
    return this._preferences;
  }

  // #endregion

  static create(
    email: Email,
    username: Username,
    hashedPassword: HashedPassword,
  ) {
    return new User(
      undefined,
      undefined,
      email,
      username,
      FullName.create(''),
      hashedPassword,
      undefined,
      Preferences.create(DEFAULT_USER_PREFERENCES),
    );
  }

  static fromPlain(plainObject: PrismaUser): User {
    const {
      id,
      uid,
      email,
      username,
      fullName,
      hashedPassword,
      bio,
      preferences,
    } = plainObject;

    return new User(
      id,
      uid,
      Email.create(email),
      Username.create(username),
      FullName.create(fullName),
      HashedPassword.create(hashedPassword),
      bio,
      Preferences.create(preferences as Record<string, string>),
    );
  }

  toBasic(): UserBasic {
    return {
      uid: this._uid.toString(),
      email: this._email.value,
      username: this._username.value,
      fullName: this._fullName.value,
    };
  }
}
