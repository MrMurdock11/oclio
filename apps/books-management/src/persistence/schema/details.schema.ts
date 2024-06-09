import { Prop, SchemaFactory } from '@nestjs/mongoose';

export class Details {
  @Prop({ type: String })
  category: string;

  @Prop({ type: String })
  genrePath: string;

  @Prop({ type: Number })
  volume: number;
}

export const ChapterScheme = SchemaFactory.createForClass(Details);
