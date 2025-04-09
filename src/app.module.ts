import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';  //used to implement rate limiting (a technique used to protect from brute force attacks)
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule, 
    DatabaseModule, 
    EmployeesModule, 
    ThrottlerModule.forRoot([{
      name:'short',
      ttl:10000, //miliseconds 
      limit: 3
     },{
      name:'long',
      ttl:60000, //miliseconds 60000ms = 60mins
      limit:100, // 100 requests in one minute
     }]), AuthModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  }],
})
export class AppModule {}
