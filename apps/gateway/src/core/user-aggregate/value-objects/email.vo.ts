import { ValueObject } from '../../shared-kernel/primitives/value-object';

export class Email extends ValueObject<Email> {
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
    return new Email(value);
  }
}
