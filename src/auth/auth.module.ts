import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module'; // import here

@Module({
  imports: [JwtModule.register({
    secret : process.env.JWT_ACCESS_SECRET,
    signOptions: { expiresIn:'15m'},
  }), PrismaModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}