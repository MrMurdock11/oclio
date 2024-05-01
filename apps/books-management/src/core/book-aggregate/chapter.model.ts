import { Entity, UNCREATED_ID } from '@oclio/core';

export class Chapter extends Entity {
  private _title: string;

  private _text: string;

  private constructor(id: bigint, title: string, text: string) {
    super(id);
    this._title = title;
    this._text = text;
  }

  static create(title: string, text: string): Chapter {
    return new Chapter(UNCREATED_ID, title, text);
  }
}
