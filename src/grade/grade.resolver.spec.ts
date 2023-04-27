import { Test, TestingModule } from '@nestjs/testing';
import { GradeResolver } from './grade.resolver';
import { GradeService } from './grade.service';

describe('LikeResolver', () => {
  let resolver: GradeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GradeResolver, GradeService],
    }).compile();

    resolver = module.get<GradeResolver>(GradeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
