import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Types } from 'mongoose';

@Schema()
export class Chapter {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String })
  text: string;

  @Prop({ type: Types.ObjectId, required: true, ref: 'Book' })
  bookId: Types.ObjectId;
}

export const ChapterScheme = SchemaFactory.createForClass(Chapter);
