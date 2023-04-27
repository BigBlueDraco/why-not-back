import { Injectable } from '@nestjs/common';
import { CreateGradeInput } from './dto/create-grade.input';
import { UpdateGradeInput } from './dto/update-grade.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Grade } from './entities/grade.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GradeService {
  constructor(
    @InjectRepository(Grade)
    private readonly likeRepository: Repository<Grade>,
  ) {}
  async create(createLikeInput: CreateGradeInput) {
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

  update(id: number, updateLikeInput: UpdateGradeInput) {
    return `This action updates a #${id} like`;
  }

  remove(id: number) {
    return `This action removes a #${id} like`;
  }
}
