export declare abstract class ValueObject<T extends ValueObject<T>> {
    protected abstract getEqualityComponents(): any[];
    equals(other: ValueObject<T> | null): boolean;
}
