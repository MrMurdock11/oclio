export abstract class Entity<Type extends string | bigint> {
  protected readonly _id: Type;

  protected readonly _uid: string;

  constructor(id: Type, uid: string) {
    this._id = id;
    this._uid = uid;
  }

  get id() {
    return this._id;
  }

  get uid() {
    return this._uid;
  }

  equals(other: Entity<Type> | null): boolean {
    if (other === null || other === undefined) {
      return false;
    }

    if (this.constructor !== other.constructor) {
      return false;
    }

    return this._id === other.id && this._uid === other.uid;
  }
}
