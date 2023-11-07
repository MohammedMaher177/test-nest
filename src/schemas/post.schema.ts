import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from './user.schema';
export type PostDocument = HydratedDocument<Post>;
@Schema()
export class Post {
  @Prop({ required: true, trim: true })
  content: string;

  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ required: true, default: Date.now() })
  date: number;
}
export const PostSchema = SchemaFactory.createForClass(Post);
