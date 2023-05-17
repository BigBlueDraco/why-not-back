import { Field } from '@nestjs/graphql';
import { FileUpload } from 'graphql-upload-ts/dist/Upload';

export class uploadToDrive {
  @Field()
  file: FileUpload;
  @Field()
  userId: number;
}
