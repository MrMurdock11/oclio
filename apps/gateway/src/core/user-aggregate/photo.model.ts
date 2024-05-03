import { Photo as PrismaPhoto } from '@prisma/client';
import { Expose } from 'class-transformer';

import { Entity } from '../shared-kernel/primitives/entity';

export class Photo extends Entity {
  @Expose({ name: 'base64' })
  private _base64: string;

  private constructor(id: bigint, base64: string) {
    super(id);
    this._base64 = base64;
  }

  get base64() {
    return this._base64;
  }

  static create(base64: string) {
    return new Photo(undefined, base64);
  }

  static fromPlain(plainObject: PrismaPhoto): Photo {
    const { id, base64 } = plainObject;

    return new Photo(id, base64);
  }
}
