import { Product } from "src/core/models";

export class ResponseGetByIdDto {
	constructor(public product: Product) {}
}
