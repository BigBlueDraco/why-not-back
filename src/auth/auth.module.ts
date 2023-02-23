import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthResolver } from './resolvers/auth.resolver';
import { LocalStrategy } from './strategys/locale.strategy';
import { PassportModule } from '@nestjs/passport/dist';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt/dist';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategys/jwt-strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        signOptions: {
          expiresIn: configService.get<string>('JWT_LIFE_TIME'),
        },
        secret: configService.get<string>('JWT_SECRET'),
      }),
    }),
    ConfigModule.forRoot(),
  ],
  providers: [AuthService, AuthResolver, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
