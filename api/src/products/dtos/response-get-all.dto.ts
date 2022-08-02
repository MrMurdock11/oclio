import { Product } from "../../core/models";

export class ResponseGetAllDto {
	constructor(public products: Product[]) {}
}
