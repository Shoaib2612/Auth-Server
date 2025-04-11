import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
    @IsEmail() email: string;

    @IsNotEmpty() @IsString() username: string;

    @IsNotEmpty() @IsString() password: string;
}