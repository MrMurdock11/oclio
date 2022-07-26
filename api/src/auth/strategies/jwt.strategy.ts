import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

import { UsersService } from "../../users/users.service";
import { TokenPayload } from "../types/token-payload.type";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly usersService: UsersService,
		configService: ConfigService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request: Request) => {
					return request?.cookies?.Authentication;
				},
			]),
			secretOrKey: configService.get("JWT_SECRET"),
		});
	}

	async validate(payload: TokenPayload) {
		return this.usersService.getById(payload.userId);
	}
}
