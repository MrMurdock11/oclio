import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Types } from 'mongoose';

@Schema()
export class Book {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: Types.ObjectId })
  chapters?: Types.ObjectId[];

  @Prop({ type: Number, required: true, ref: 'Chapter' })
  createdBy: number;
}

export const BookSchema = SchemaFactory.createForClass(Book);
