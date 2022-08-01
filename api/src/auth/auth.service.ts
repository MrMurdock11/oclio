import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";

import { User } from "../core/models";
import { UsersService } from "../users/users.service";
import { TokenPayload } from "./types/token-payload.type";

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {}

	register(user: User) {
		this.usersService.create(user);
	}

	async getAuthenticationUser(
		email: string,
		password: string
	): Promise<User> {
		const user = await this.usersService.getByEmail(email);
		await this.verifyPassword(password, user.password);

		return user;
	}

	getCookieWithJwtToken(userId: number) {
		const payload: TokenPayload = { userId };
		const token = this.jwtService.sign(payload);

		return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
			"JWT_EXPIRATION_TIME"
		)}`;
	}

	getCookieForLogOut() {
		return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
	}

	private async verifyPassword(
		incoming: string,
		matching: string
	): Promise<void> {
		const isPasswordMatching = await compare(incoming, matching);
		if (!isPasswordMatching) {
			throw new Error("Wrong credentials provided");
		}
	}
}
