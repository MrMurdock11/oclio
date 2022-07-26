import { classes } from "@automapper/classes";
import { AutomapperModule } from "@automapper/nestjs";
import Joi from "@hapi/joi";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { DatabaseModule } from "./database/database.module";
import { UsersModule } from "./users/users.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			validationSchema: Joi.object({
				POSTGRES_HOST: Joi.string().required(),
				POSTGRES_PORT: Joi.number().required(),
				POSTGRES_USER: Joi.string().required(),
				POSTGRES_PASSWORD: Joi.string().required(),
				POSTGRES_DB: Joi.string().required(),
				HASH_ROUNDS: Joi.number().required(),
				JWT_SECRET: Joi.string().required(),
				JWT_EXPIRATION_TIME: Joi.string().required(),
			}),
			isGlobal: true,
		}),
		AutomapperModule.forRoot({
			strategyInitializer: classes(),
		}),
		DatabaseModule,
		UsersModule,
		AuthModule,
	],
	providers: [AppService],
})
export class AppModule {}
