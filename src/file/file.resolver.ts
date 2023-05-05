import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FileService } from './file.service';
import {
  GraphQLUpload,
  Upload,
  FileUpload,
  graphqlUploadExpress,
} from 'graphql-upload-ts';
import { Stream } from 'stream';

@Resolver()
export class FileResolver {
  constructor(private readonly fileService: FileService) {}

  @Mutation(() => String)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ) {
    return this.fileService.uploadToDrive(file);
  }
}
