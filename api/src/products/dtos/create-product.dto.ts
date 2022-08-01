import { ProductType } from "../../core/enums";

export class CreateProductDto {
	title: string;
	content: string;
	type: ProductType;
}
