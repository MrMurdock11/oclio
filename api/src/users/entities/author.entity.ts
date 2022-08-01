import { AutoMap } from "@automapper/classes";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class AuthorEntity {
	@AutoMap()
	@PrimaryGeneratedColumn()
	id?: number;

	@AutoMap()
	@Column("varchar")
	username: string;

	@AutoMap()
	@Column("varchar", { name: "lastname" })
	lastName: string | null;

	@AutoMap()
	@Column("varchar", { name: "firstname" })
	firstName: string | null;
}
