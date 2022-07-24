import { Controller, Get } from "@nestjs/common";

import { AppService } from "./app.service";
import { UserEntity } from "./users/user.entity";
import { UsersService } from "./users/users.service";

@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		private readonly usersService: UsersService
	) {}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	@Get("/users")
	async getUsers(): Promise<UserEntity[]> {
		return await this.usersService.getUsers();
	}
}
