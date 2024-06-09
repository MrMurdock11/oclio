import { ValueObject } from '@oclio/common';

export class Details extends ValueObject<Details> {
  private constructor(
    private readonly _category?: string,
    private readonly _genrePaths?: string[],
    private readonly _volume?: number,
  ) {
    super();
  }

  static create(category?: string, genrePaths?: string[], volume?: number) {
    return new Details(category, genrePaths, volume);
  }

  protected getEqualityComponents(): any[] {
    return [this._category, this._genrePaths, this._volume];
  }

  toPresentation<T extends Record<string, any>>(): T {
    return {
      category: this._category,
      genrePaths: this._genrePaths,
      volume: this._volume,
    } as unknown as T;
  }

  toPersistence<T extends Record<string, any>>(): T {
    return {
      category: this._category,
      genrePaths: this._genrePaths,
      volume: this._volume,
    } as unknown as T;
  }
}
