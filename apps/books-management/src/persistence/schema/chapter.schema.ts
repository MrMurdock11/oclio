import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Chapter {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String })
  text: string;
}

export const ChapterScheme = SchemaFactory.createForClass(Chapter);
