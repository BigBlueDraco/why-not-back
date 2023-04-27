import { Module } from '@nestjs/common';
import { GradeService } from './grade.service';
import { GradeResolver } from './grade.resolver';
import { Grade } from './entities/grade.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfferModule } from 'src/offer/offer.module';

@Module({
  imports: [TypeOrmModule.forFeature([Grade]), OfferModule],
  providers: [GradeResolver, GradeService],
  exports: [GradeService],
})
export class GradeModule {}
