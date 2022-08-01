import { AutoMap } from "@automapper/classes";

export class Author {
	@AutoMap()
	id: number;

	@AutoMap()
	username: string;

	@AutoMap()
	lastName: string;

	@AutoMap()
	firstName: string;
}
