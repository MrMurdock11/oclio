import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

import { User } from "../../core/models";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
		super({
			usernameField: "email",
		});
	}

	async validate(email: string, password: string): Promise<User> {
		return await this.authService.getAuthenticationUser(email, password);
	}
}
