import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";

import { Product } from "../core/models";
import { CreateProductDto } from "./dtos/create-product.dto";
import { ProductEntity } from "./product.entity";

@Injectable()
export class ProductProfile extends AutomapperProfile {
	constructor(@InjectMapper() mapper: Mapper) {
		super(mapper);
	}

	get profile() {
		return (mapper: Mapper) => {
			createMap(
				mapper,
				CreateProductDto,
				Product,
				forMember(
					d => d.title,
					mapFrom(s => s.title)
				),
				forMember(
					d => d.content,
					mapFrom(s => s.content)
				),
				forMember(
					d => d.type,
					mapFrom(s => s.type)
				)
			);

			createMap(mapper, Product, ProductEntity);
			createMap(mapper, ProductEntity, Product);
		};
	}
}
