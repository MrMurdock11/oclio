import { HttpException, HttpStatus } from '@nestjs/common';

interface PlainResult<T> {
  httpStatus: HttpStatus;
  success: boolean;
  value?: T;
  errorMessage?: string;
}

export class RpcResult<T, E extends string = string> {
  private readonly _success: boolean;

  private constructor(
    private readonly _httpStatus: HttpStatus,
    private readonly _value?: T,
    private readonly _errorMessage?: E,
  ) {
    this._success = this._errorMessage === undefined;
  }

  public static ok<U>(
    httpStatus: HttpStatus,
    value: U = undefined,
  ): RpcResult<U, never> {
    return new RpcResult(httpStatus, value);
  }

  public static fail<F extends string>(
    httpStatus: HttpStatus,
    errorMessage: F,
  ): RpcResult<never, F> {
    return new RpcResult<never, F>(
      httpStatus,
      undefined as never,
      errorMessage,
    );
  }

  public static fromJson<U, F extends string = string>(
    json: PlainResult<U>,
  ): RpcResult<U, F> {
    if (json.success) {
      return RpcResult.ok<U>(json.httpStatus, json.value);
    } else {
      return RpcResult.fail<F>(json.httpStatus, json.errorMessage as F);
    }
  }

  public getOrThrow(): T {
    if (this._success) {
      return this._value;
    } else {
      throw new HttpException(this._errorMessage, this._httpStatus);
    }
  }

  public toJson(): PlainResult<T> {
    return {
      httpStatus: this._httpStatus,
      success: this._success,
      ...(this._success
        ? { value: this._value }
        : { errorMessage: this._errorMessage }),
    };
  }
}
