import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { GradeModule } from './grade/grade.module';
import { OfferModule } from './offer/offer.module';
import { UsersModule } from './users/users.module';
import { FileModule } from './file/file.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          autoSchemaFile: 'schema.ggl',
          sortSchema: true,
          playground: true,
        }),
      ],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          charset: 'utf-8',
          type: 'postgres',
          host: 'localhost',
          username: config.get<string>('TYPEORM_USERNAME'),
          password: config.get<string>('TYPEORM_PASSWORD'),
          database: config.get<string>('TYPEORM_DATABASE'),
          port: config.get<number>('TYPEORM_PORT'),
          entitys: config.get<string>('TYPEORM_ENTITIES'),
          synchronize: config.get<boolean>('TYPEORM_SYNCHRONIZE'),
          autoLoadEntities: true,
        };
      },
    }),
    UsersModule,
    AuthModule,
    OfferModule,
    GradeModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
