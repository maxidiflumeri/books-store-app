import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Configuration } from "../../../config/config.keys";
import { ConfigService } from "../../../config/config.service";
import { Status } from "../../../shared/status.enum";
import { AuthRepository } from "../auth.repository";
import { IJwtPayload } from "../jwtPayload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly _configService: ConfigService,
        @InjectRepository(AuthRepository)
        private readonly _authRepository: AuthRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: _configService.get(Configuration.JWT_SECRET_KEY)
        })
    }

    async validate(payload: IJwtPayload) {
        const { email } = payload
        const user = await this._authRepository.findOne({where: {email: email, status: Status.ACTIVE}})

        if(!user){
            throw new UnauthorizedException()
        }

        return payload
    }
}