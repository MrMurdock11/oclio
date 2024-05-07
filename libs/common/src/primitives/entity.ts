export abstract class Entity<Type extends string | bigint> {
  protected readonly _id: Type;

  constructor(id: Type) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  equals(other: Entity<Type> | null): boolean {
    if (other === null || other === undefined) {
      return false;
    }

    if (this.constructor !== other.constructor) {
      return false;
    }

    return this._id === other.id;
  }
}
