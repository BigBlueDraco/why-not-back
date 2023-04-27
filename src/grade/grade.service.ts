import { Injectable } from '@nestjs/common';
import { CreateGradeInput } from './dto/create-grade.input';
import { UpdateGradeInput } from './dto/update-grade.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Grade } from './entities/grade.entity';
import { Repository } from 'typeorm';

const gradesTypes = {
  like: 'like',
  dislike: 'dislike',
  mathe: 'mathe',
};

@Injectable()
export class GradeService {
  constructor(
    @InjectRepository(Grade)
    private readonly gradeRepository: Repository<Grade>,
  ) {}
  async create(createLikeInput: CreateGradeInput) {
    const { givenId, receivedId } = createLikeInput;
    const existGrade = await this.gradeRepository.findOne({
      where: {
        givenId: givenId,
        receivedId: receivedId,
      },
    });

    if (existGrade) {
      return existGrade;
    }
    const existReceivedGrade = await this.gradeRepository.findOne({
      where: { receivedId: givenId },
    });

    if (
      existReceivedGrade?.grade === gradesTypes.mathe ||
      existReceivedGrade?.grade === gradesTypes.dislike
    ) {
      return existReceivedGrade;
    }

    if (existReceivedGrade && existReceivedGrade.grade === gradesTypes.like) {
      await this.gradeRepository.update(existReceivedGrade.id, {
        grade: createLikeInput.isLiked
          ? gradesTypes.mathe
          : gradesTypes.dislike,
      });
      return await this.findOne(existReceivedGrade.id);
    }

    return await this.gradeRepository.save({
      ...createLikeInput,
      grade: createLikeInput.isLiked ? gradesTypes.like : gradesTypes.dislike,
    });
  }

  async findAll() {
    return await this.gradeRepository.find({
      relations: { given: true, received: true },
    });
  }

  async findOne(id: number) {
    return await this.gradeRepository.findOne({
      where: { id },
      relations: { given: true, received: true },
    });
  }

  update(id: number, updateLikeInput: UpdateGradeInput) {
    return `This action updates a #${id} like`;
  }

  async remove(id: number) {
    const offer = await this.findOne(id);
    await this.gradeRepository.delete({ id });
    return offer || null;
  }
}
