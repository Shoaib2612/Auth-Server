import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { retryWhen } from 'rxjs';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { updatedUserDto } from './dto/update-user-dto';
@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService){}
    @Get() //GET /users
    findAll(@Query('role') role?: 'INTERN' | 'ADMIN' | 'ENGINEER') {
        return this.userService.findAll(role)
    }

    @Get(':id') //GET /users/:id
    findOne(@Param('id',ParseIntPipe) id: number){
        return this.userService.findOne(id)
    }

    // @Get('interns') //GET /users/intern

    @Post()
    create(@Body(ValidationPipe) user: CreateUserDto){
        return this.userService.create(user)
    }

    @Patch(':id')
    update(@Param('id',ParseIntPipe) id:number, @Body(ValidationPipe) userUpdate:updatedUserDto){
        return this.userService.update(id,userUpdate)
    }

    @Delete(':id')
    remove(@Param('id',ParseIntPipe) id:number){
        return this.userService.delete(id)
    }
}
