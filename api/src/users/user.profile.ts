import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { RegisterRequestDto } from "../auth/dtos/register-request.dto";
import { User } from "../core/models";
import { UserEntity } from "./entities/user.entity";

@Injectable()
export class UserProfile extends AutomapperProfile {
	@Inject()
	private readonly configService: ConfigService;

	constructor(@InjectMapper() mapper: Mapper) {
		super(mapper);
	}

	get profile() {
		return (mapper: Mapper) => {
			createMap(
				mapper,
				RegisterRequestDto,
				User,
				forMember(
					d => d.username,
					mapFrom(s => s.username)
				),
				forMember(
					d => d.email,
					mapFrom(s => s.email)
				),
				forMember(
					d => d.password,
					mapFrom(s =>
						User.hash(
							s.password,
							this.configService.getOrThrow("HASH_ROUNDS")
						)
					)
				)
			);

			createMap(mapper, UserEntity, User);
			createMap(mapper, User, UserEntity);
		};
	}
}
