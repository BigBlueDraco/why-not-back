import { Injectable } from '@nestjs/common';
import { CreateLikeInput } from './dto/create-like.input';
import { UpdateLikeInput } from './dto/update-like.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
  ) {}
  async create(createLikeInput: CreateLikeInput) {
    const like = await this.likeRepository.save({
      ...createLikeInput,
    });
    return like;
  }

  async findAll() {
    return await this.likeRepository.find({
      relations: { given: true, received: true },
    });
  }

  async findOne(id: number) {
    return await this.likeRepository.findOne({
      where: { id },
      relations: { given: true, received: true },
    });
  }

  update(id: number, updateLikeInput: UpdateLikeInput) {
    return `This action updates a #${id} like`;
  }

  remove(id: number) {
    return `This action removes a #${id} like`;
  }
}
