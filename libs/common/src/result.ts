import { RpcException } from '@nestjs/microservices';

export class Result<T, E extends string = string> {
  private readonly _success: boolean;

  protected constructor(
    private readonly _value?: T,
    private readonly _error?: E,
  ) {
    this._success = _error === undefined;
  }

  public static ok<U>(value: U = undefined): Result<U, never> {
    return new Result(value);
  }

  public static fail<F extends string>(error: F): Result<never, F> {
    return new Result<never, F>(undefined as never, error);
  }

  public getOrThrow(): T {
    if (this._success) {
      return this._value;
    } else {
      throw new RpcException(this._error);
    }
  }
}
