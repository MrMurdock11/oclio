import { AutoMap } from "@automapper/classes";

import { ProductType } from "../enums";
import { Author } from "./author";

export class Product {
	@AutoMap()
	id?: number;

	@AutoMap()
	title: string;

	@AutoMap()
	type: ProductType;

	@AutoMap(() => Author)
	author: Author;

	@AutoMap()
	content?: string;

	@AutoMap()
	created: Date;

	@AutoMap()
	edited?: Date;

	@AutoMap()
	isDraft?: boolean;
}
