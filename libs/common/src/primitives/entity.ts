export abstract class Entity {
  private readonly _id: bigint;

  constructor(id: bigint) {
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

    return this._id === other.id;
  }
}
