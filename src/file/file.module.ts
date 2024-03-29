import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileResolver } from './file.resolver';

@Module({
  providers: [FileResolver, FileService],
  exports: [FileService],
})
export class FileModule {}
