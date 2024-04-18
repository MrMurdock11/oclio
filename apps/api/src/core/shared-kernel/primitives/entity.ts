import { Expose, Transform } from 'class-transformer';
import { UniqueId } from './unique-id.vo';

export abstract class Entity {
  @Expose({ name: 'id' })
  @Transform(({ value }) => value.value)
  private readonly _id: UniqueId;

  constructor(id: UniqueId) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  equals(other: Entity | null): boolean {
    if (other === null || other === undefined) {
      return false;
    }

    if (this.constructor !== other.constructor) {
      return false;
    }

    return this._id.equals(other.id);
  }
}
