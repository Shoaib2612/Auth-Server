import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';
@Module({
  imports: [JwtModule.register({
    secret : process.env.JWT_ACCESS_SECRET,
    signOptions: { expiresIn:'15m'},
  }), DatabaseModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}