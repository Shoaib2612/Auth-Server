import { Module } from '@nestjs/common';
import { AuthService } from './auth_server.service';
import { AuthController } from './auth_server.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
    DatabaseModule,
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule { }
