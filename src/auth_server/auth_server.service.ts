import { Injectable, ForbiddenException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth_server.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable() export class AuthService {
    constructor(private readonly prisma: DatabaseService, private readonly jwtService: JwtService,) { }
    async signup(dto: AuthDto) {
        const userExists = await this.prisma.user.findUnique({
            where: { email: dto.email }
        });
        if (userExists) {
            throw new ForbiddenException('User already exists');
        }

        const hash = await bcrypt.hash(dto.password, 10);

        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                username: dto.username,
                password: hash,
            },
        });
        return {
            message: 'Signup successful',
            userId: user.id,
        };
    }

    async login(dto: AuthDto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email }
        });
        if (!user || !(await bcrypt.compare(dto.password, user.password))) {
            throw new ForbiddenException('Invalid credentials');
        }

        const tokens = await this.generateTokens(user.id, user.username, user.email);
        return {
            message: 'Login successful',
            userId: user.id,
            ...tokens,
        };
    }
    private async generateTokens(userId: number, username: string, email: string) {
        const payload = { sub: userId, username, email };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: process.env.JWT_ACCESS_SECRET,
                expiresIn: '15m',
            }),
            this.jwtService.signAsync(payload, {
                secret: process.env.JWT_REFRESH_SECRET,
                expiresIn: '7d',
            }),
        ]);
        return { accessToken, refreshToken };
    }
}
