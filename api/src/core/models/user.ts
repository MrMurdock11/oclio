import { AutoMap } from "@automapper/classes";
import { genSaltSync, hashSync } from "bcrypt";

export class User {
	@AutoMap()
	id: number;

	@AutoMap()
	username: string;

	@AutoMap()
	lastName: string;

	@AutoMap()
	firstName: string;

	@AutoMap()
	email: string;

	@AutoMap()
	password: string;

	static hash(password: string, rounds: number): string {
		const salt = genSaltSync(rounds);
		return hashSync(password, salt);
	}
}
