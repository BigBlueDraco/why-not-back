import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeResolver } from './like.resolver';
import { Like } from './entities/like.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfferModule } from 'src/offer/offer.module';

@Module({
  imports: [TypeOrmModule.forFeature([Like]), OfferModule],
  providers: [LikeResolver, LikeService],
  exports: [LikeService],
})
export class LikeModule {}
