import { ValueObject } from '../../shared-kernel/primitives/value-object';

export class HashedPassword extends ValueObject<HashedPassword> {
  private constructor(private readonly _value: string) {
    super();
  }

  get value() {
    return this._value;
  }

  protected getEqualityComponents(): any[] {
    return [this._value];
  }

  static create(value: string) {
    return new HashedPassword(value);
  }
}
