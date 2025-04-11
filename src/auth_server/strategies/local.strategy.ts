import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth_server.service';

@Injectable() export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) { super({ usernameField: 'email' }); }

    async validate(email: string, password: string) {
        const user = await this.authService.login({
            email, password, username: ''
        });
        if (!user) {
            throw new UnauthorizedException('Invalid login credentials');
        }
        return user;
    }
}
