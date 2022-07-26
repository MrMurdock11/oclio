import { MapPipe } from "@automapper/nestjs";
import {
	Body,
	Controller,
	HttpCode,
	HttpException,
	HttpStatus,
	Post,
	Req,
	Res,
	UseGuards,
} from "@nestjs/common";
import { Response } from "express";

import { PostgresErrorCode } from "../database/postgres-error-codes";
import { User } from "../models/user";
import { AuthService } from "./auth.service";
import { RegisterRequestDto } from "./dtos/register-request.dto";
import { JwtAuthGuard } from "./guards/jwt-authentication.guard";
import { LocalAuthGuard } from "./guards/localAuth.guard";
import { RequestWithUser } from "./types/request-with-user.type";

@Controller("api/auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@HttpCode(200)
	@UseGuards(LocalAuthGuard)
	@Post("log-in")
	async logIn(@Req() req: RequestWithUser, @Res() res: Response) {
		try {
			const { user } = req;
			const cookie = this.authService.getCookieWithJwtToken(user.id);
			res.setHeader("Set-Cookie", cookie);

			return res.send();
		} catch (error) {
			if (error instanceof HttpException) {
				throw error;
			}

			if (error instanceof Error) {
				throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
			}
		}
	}

	@UseGuards(JwtAuthGuard)
	@Post("log-out")
	async logOut(_: never, @Res() res: Response) {
		res.setHeader("Set-Cookie", this.authService.getCookieForLogOut());
		return res.sendStatus(HttpStatus.OK);
	}

	@Post("register")
	async register(
		@Body(MapPipe(RegisterRequestDto, User)) user: User
	): Promise<void> {
		try {
			this.authService.register(user);
		} catch (error) {
			if (error?.code === PostgresErrorCode.UniqueViolation) {
				throw new HttpException(
					"User with that email already exists",
					HttpStatus.BAD_REQUEST
				);
			}

			if (error instanceof HttpException) {
				throw error;
			}

			if (error instanceof Error) {
				throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
			}
		}
	}
}
