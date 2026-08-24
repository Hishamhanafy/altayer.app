import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET', 'super_secret_jwt_key_change_in_production_3altayer_2026'),
    });
  }

  async validate(payload: any) {
    return {
      id: payload.sub,
      phoneNumber: payload.phoneNumber,
      role: payload.role,
      driverProfileId: payload.driverProfileId,
    };
  }
}
