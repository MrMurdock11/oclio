import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { isNil } from "lodash";
import { Repository } from "typeorm";

import { Product } from "../core/models";
import { AuthorEntity } from "../users/entities/author.entity";
import { ProductEntity } from "./product.entity";

@Injectable()
export class ProductsService {
	constructor(
		@InjectRepository(ProductEntity)
		private readonly productRepo: Repository<ProductEntity>,
		@InjectRepository(AuthorEntity)
		private readonly authorRepo: Repository<AuthorEntity>,
		@InjectMapper()
		private readonly mapper: Mapper
	) {}

	async create(product: Product, userId: number): Promise<void> {
		const authorEntity = await this.authorRepo.findOneBy({ id: userId });
		if (isNil(authorEntity)) {
			throw new Error("Author doesn't exist.");
		}

		const productEntity = this.mapper.map(product, Product, ProductEntity);
		productEntity.created = new Date();
		productEntity.isDraft = true;
		productEntity.author = authorEntity;

		await this.productRepo.save(productEntity);
	}
}
