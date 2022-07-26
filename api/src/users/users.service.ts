import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "../models/user";
import { UserEntity } from "./user.entity";

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly repo: Repository<UserEntity>,
		@InjectMapper()
		private readonly mapper: Mapper
	) {}

	async getById(id: number): Promise<User> {
		const entity = await this.repo.findOneBy({ id });
		if (!entity) {
			throw new HttpException(
				"User with this email doesn't exist.",
				HttpStatus.NOT_FOUND
			);
		}

		const user = this.mapper.map(entity, UserEntity, User);
		return user;
	}

	async getByEmail(email: string): Promise<User> {
		const entity = await this.repo.findOneBy({ email });
		if (!entity) {
			throw new HttpException(
				"User with this email doesn't exist.",
				HttpStatus.NOT_FOUND
			);
		}

		const user = this.mapper.map(entity, UserEntity, User);
		return user;
	}

	async create(user: User): Promise<void> {
		const userEntity = this.repo.create(user);
		await this.repo.save(userEntity);
	}
}
