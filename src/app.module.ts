import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
// import { AuthModule } from './auth/auth.module';
import { AuthModule } from './auth_server/auth_server.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
    }),
    DatabaseModule, 
    AuthModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
