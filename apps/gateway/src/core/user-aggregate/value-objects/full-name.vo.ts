import { ValueObject } from '../../shared-kernel/primitives/value-object';

export class FullName extends ValueObject<FullName> {
  private constructor(private readonly _value: string) {
    super();
  }

  // #region getters

  get value() {
    return this._value;
  }

  // #endregion

  protected getEqualityComponents(): any[] {
    return [this._value];
  }

  static create(fullName: string) {
    return new FullName(fullName);
  }
}
