import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy,StrategyOptions} from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: process.env.JWT_ACCESS_SECRET || 'fallback_secret',
      } ); 
    }
  
    async validate(payload: any) {
      return payload;
    }
  }