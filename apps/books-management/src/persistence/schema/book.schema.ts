import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { BookStatus } from '../../shared/enums';
import { Chapter } from './chapter.schema';
import { Details } from './details.schema';

@Schema({ timestamps: true })
export class Book {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: Details })
  details: Details;

  @Prop({ required: true, type: Number })
  status: BookStatus;

  @Prop({ type: [Chapter], default: [] })
  chapters: Chapter[];

  @Prop({ type: BigInt, required: true })
  createdBy: bigint;
}

export const BookSchema = SchemaFactory.createForClass(Book);
