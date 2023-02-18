import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { type } from 'os';
import { AppController } from './app.controller';
import { AppService } from './app.service';
try {
} catch (e) {
  console.log(e);
}
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          charset: 'utf-8',
          entities: [],
          type: config.get<any>('TYPEORM_CONNECTION'),
          username: config.get<string>('TYPEORM_USERNAME'),
          password: config.get<string>('TYPEORM_PASSWORD'),
          database: config.get<string>('TYPEORM_DATABASE'),
          port: config.get<number>('TYPEORM_PORT'),
          synchronize: true,
          autoLoadEntities: true,
          logging: true,
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
