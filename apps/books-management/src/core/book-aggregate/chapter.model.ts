import { Entity, UNCREATED_ID } from '@oclio/common';

export class Chapter extends Entity<string> {
  private _title: string;

  private _text: string;

  private constructor(id: string, title: string, text: string) {
    super(id);
    this._title = title;
    this._text = text;
  }

  get title() {
    return this._title;
  }

  get text() {
    return this._text;
  }

  static create(title: string, text: string): Chapter {
    return new Chapter(UNCREATED_ID, title, text);
  }

  static toDomain<Entity extends Record<string, any>>(entity: Entity): Chapter {
    const { id, title, text } = entity;

    return new Chapter(id, title, text);
  }

  toPresentation<T extends Record<string, any>>(): T {
    return {
      id: this._id,
      title: this._title,
      text: this._text,
    } as unknown as T;
  }

  toPersistence<T extends Record<string, any>>(): T {
    return {
      id: this._id,
      title: this._title,
      text: this._text,
    } as unknown as T;
  }
}
