import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Post,
	Put,
	Req,
	UseGuards,
} from "@nestjs/common";

import { JwtAuthGuard } from "../auth/guards/jwt-authentication.guard";
import { RequestWithUser } from "../auth/types/request-with-user.type";
import { Product } from "../core/models";
import { PostgresErrorCode } from "../database/postgres-error-codes";
import { CreateProductDto } from "./dtos/create-product.dto";
import { ProductsService } from "./products.service";

@Controller("api/products")
@UseGuards(JwtAuthGuard)
export class ProductsController {
	constructor(
		private readonly productsService: ProductsService,
		@InjectMapper()
		private readonly mapper: Mapper
	) {}

	@Get()
	getAll() {
		return [];
	}

	@Get(":id")
	getById(@Param("id") id: number) {
		return id;
	}

	@Post()
	async create(
		@Req() request: RequestWithUser,
		@Body() dto: CreateProductDto
	) {
		try {
			const { user } = request;
			const product = this.mapper.map(dto, CreateProductDto, Product);

			await this.productsService.create(product, user.id);
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

	@Put(":id")
	update(@Param("id") id: number) {
		return id;
	}

	@Delete(":id")
	delete(@Param("id") id: number) {
		return id;
	}
}
