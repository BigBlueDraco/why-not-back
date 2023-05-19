import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Grade } from 'src/grade/entities/grade.entity';
import { init1684516531017 } from 'src/migrations/1684516531017-init';
import { Offer } from 'src/offer/entities/offer.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { DataSource } from 'typeorm';

config();

const configService = new ConfigService();

console.log(configService.get<string>('TYPEORM_DATABASE'));
export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  username: configService.get<string>('TYPEORM_USERNAME'),
  password: 'root',
  database: configService.get<string>('TYPEORM_DATABASE'),
  port: configService.get<number>('TYPEORM_PORT'),
  entities: [UserEntity, Grade, Offer],
  synchronize: configService.get<boolean>('TYPEORM_SYNCHRONIZE'),
  migrations: [init1684516531017],
});
