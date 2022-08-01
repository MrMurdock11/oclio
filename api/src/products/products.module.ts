import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthorEntity } from "../users/entities/author.entity";
import { ProductEntity } from "./product.entity";
import { ProductProfile } from "./product.profile";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";

@Module({
	imports: [TypeOrmModule.forFeature([ProductEntity, AuthorEntity])],
	controllers: [ProductsController],
	providers: [ProductsService, ProductProfile],
})
export class ProductsModule {}
