import { ValueObject } from '../../shared-kernel/primitives/value-object';

export class Preferences extends ValueObject<Preferences> {
  private constructor(private readonly _value: Record<string, string>) {
    super();
  }

  get value() {
    return this._value;
  }

  static create(value: Record<string, string>): Preferences {
    return new Preferences(value);
  }

  protected getEqualityComponents(): any[] {
    return [this._value];
  }
}
