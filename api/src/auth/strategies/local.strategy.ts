import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

import { User } from "../../models/user";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly authService: AuthService,
		private readonly configService: ConfigService
	) {
		super({
			usernameField: "email",
		});
	}

	async validate(email: string, password: string): Promise<User> {
		return await this.authService.getAuthenticationUser(email, password);
	}
}
