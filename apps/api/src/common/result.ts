type DomainError = string;

export abstract class Result<T> {
  public static ok<U>(value: U): Result<U> {
    return new Ok(value);
  }

  public static fail<E extends DomainError>(error: E): Result<never> {
    return new Err(error);
  }

  public abstract isSuccess(): this is Ok<T>;
  public abstract isFailure(): this is Err;
}

class Ok<T> extends Result<T> {
  constructor(public readonly value: T) {
    super();
  }

  public isSuccess(): this is Ok<T> {
    return true;
  }

  public isFailure(): this is Err {
    return false;
  }
}

class Err extends Result<never> {
  constructor(public readonly error: DomainError) {
    super();
  }

  public isSuccess(): this is Ok<never> {
    return false;
  }

  public isFailure(): this is Err {
    return true;
  }
}
