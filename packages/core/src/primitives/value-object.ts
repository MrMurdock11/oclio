export abstract class ValueObject<T extends ValueObject<T>> {
  protected abstract getEqualityComponents(): any[];

  equals(other: ValueObject<T> | null): boolean {
    if (other === null || other === undefined) {
      return false;
    }

    if (this.constructor !== other.constructor) {
      return false;
    }

    return this.getEqualityComponents().every((component, index) => {
      return component === other.getEqualityComponents()[index];
    });
  }
}
