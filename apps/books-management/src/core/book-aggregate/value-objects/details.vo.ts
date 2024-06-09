import { ValueObject } from '@oclio/common';

export class Details extends ValueObject<Details> {
  private constructor(
    private readonly _category?: string,
    private readonly _genrePath?: string,
    private readonly _volume?: number,
  ) {
    super();
  }

  static create(category?: string, genre?: string, volume?: number) {
    return new Details(category, genre, volume);
  }

  protected getEqualityComponents(): any[] {
    return [this._category, this._genrePath, this._volume];
  }

  toPresentation<T extends Record<string, any>>(): T {
    return {
      category: this._category,
      genrePath: this._genrePath,
      volume: this._volume,
    } as unknown as T;
  }

  toPersistence<T extends Record<string, any>>(): T {
    return {
      category: this._category,
      genrePath: this._genrePath,
      volume: this._volume,
    } as unknown as T;
  }
}
