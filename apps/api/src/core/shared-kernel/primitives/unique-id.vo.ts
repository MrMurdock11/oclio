import { ValueObject } from './value-object';

export class UniqueId extends ValueObject<UniqueId> {
  private readonly _id: bigint;

  private constructor(id?: bigint) {
    super();
    this._id = id;
  }

  get value(): bigint {
    return this._id;
  }

  static create(id?: bigint) {
    return new UniqueId(id);
  }

  equals(other: UniqueId): boolean {
    if (other === null || other === undefined) {
      return false;
    }

    if (!(other instanceof UniqueId)) {
      return false;
    }

    return this._id === other.value;
  }

  protected getEqualityComponents(): any[] {
    return [this._id];
  }
}
