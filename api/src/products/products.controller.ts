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
import { CreateProductDto } from "./dtos/create-product.dto";
import { ResponseGetAllDto } from "./dtos/response-get-all.dto";
import { ResponseGetByIdDto } from "./dtos/response-get-by-id.dto";
import { UpdateProductDto } from "./dtos/update-product.dto";
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
	async getAll(): Promise<ResponseGetAllDto> {
		try {
			const products = await this.productsService.getAll();

			return new ResponseGetAllDto(products);
		} catch (error) {
			if (error instanceof HttpException) {
				throw error;
			}

			if (error instanceof Error) {
				throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
			}

			throw error;
		}
	}

	@Get(":id")
	async getById(@Param("id") id: number): Promise<ResponseGetByIdDto> {
		try {
			const product = await this.productsService.getById(id);

			return new ResponseGetByIdDto(product);
		} catch (error) {
			if (error instanceof HttpException) {
				throw error;
			}

			if (error instanceof Error) {
				throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
			}

			throw error;
		}
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
			if (error instanceof HttpException) {
				throw error;
			}

			if (error instanceof Error) {
				throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
			}
		}
	}

	@Put(":id")
	async update(@Param("id") id: number, @Body() dto: UpdateProductDto) {
		try {
			await this.productsService.update(id, dto);
		} catch (error) {
			if (error instanceof HttpException) {
				throw error;
			}

			if (error instanceof Error) {
				throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
			}
		}
	}

	@Delete(":id")
	async delete(@Param("id") id: number) {
		try {
			await this.productsService.delete(id);
		} catch (error) {
			if (error instanceof HttpException) {
				throw error;
			}

			if (error instanceof Error) {
				throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
			}
		}
	}
}
