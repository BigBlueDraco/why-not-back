import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { OfferModule } from './offer/offer.module';
import { LikeModule } from './like/like.module';
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
          entities: [],
          type: 'postgres',
          host: 'localhost',
          username: config.get<string>('TYPEORM_USERNAME'),
          password: config.get<string>('TYPEORM_PASSWORD'),
          database: config.get<string>('TYPEORM_DATABASE'),
          port: config.get<number>('TYPEORM_PORT'),
          synchronize: true,
          autoLoadEntities: true,
        };
      },
    }),
    UsersModule,
    AuthModule,
    OfferModule,
    LikeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
