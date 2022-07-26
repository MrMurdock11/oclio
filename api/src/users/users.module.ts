import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserEntity } from "./user.entity";
import { UserProfile } from "./user.profile";
import { UsersService } from "./users.service";

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity])],
	providers: [UsersService, UserProfile, ConfigService],
	exports: [UsersService, UserProfile],
})
export class UsersModule {}
