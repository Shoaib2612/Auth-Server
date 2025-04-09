import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { updatedUserDto } from './dto/update-user-dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "Leanne Graham",
            "email" : "Shoaib@gmail.com",
            "role": "INTERN"
        },
        {
            "id": 2,
            "name": "Ronaldo",
            "email" : "ronaldo@gmail.com",
            "role": "ADMIN"
        },
        {
            "id": 3,
            "name": "CR7",
            "email" : "cr7@gmail.com",
            "role": "TECH"
        },
        {
            "id": 4,
            "name": "MEssi",
            "email" : "MEssi@gmail.com",
            "role": "INTERN"
        },

    ]

    // findUsers(){
    //     return this.users
    // }

    findAll(role?:'INTERN' | 'ENGINEER' | 'ADMIN') {
        if(role){
            const rolesArray =  this.users.filter((user) => user.role === role)
            if(rolesArray.length === 0) throw new NotFoundException("User role not found")
            return rolesArray
        }
       
        return this.users
        
    }
    findOne(id:number){
        const user = this.users.find((user) => user.id === id)
        if(!user) throw new NotFoundException('User not found')
        return user
    }
    create(user : CreateUserDto){
        const userByHighestId = [...this.users].sort((a,b) => b.id - a.id)
        const newUser = {
            id : userByHighestId[0].id + 1,
            ...user
        }
        this.users.push(newUser)
        return newUser
    }

    update(id:number, updatedUser: updatedUserDto){
        this.users = this.users.map(user => {
            if(user.id === id){
                return {...user, ...updatedUser}
            }
            return user
        })
        return this.findOne(id)
    }


    delete(id:number){
        const removeUser = this.findOne(id)
        this.users = this.users.filter((user) => user.id !== id)
        return removeUser
    }
}
