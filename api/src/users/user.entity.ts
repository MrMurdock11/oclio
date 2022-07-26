import { AutoMap } from "@automapper/classes";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" })
export class UserEntity {
	@AutoMap()
	@PrimaryGeneratedColumn()
	id: number;

	@AutoMap()
	@Column("varchar", { name: "username", nullable: false })
	username: string;

	@AutoMap()
	@Column("varchar", { name: "lastname" })
	lastName: string | null;

	@AutoMap()
	@Column("varchar", { name: "firstname" })
	firstName: string | null;

	@AutoMap()
	@Column("varchar", { nullable: false })
	email: string;

	@AutoMap()
	@Column("varchar", { nullable: false })
	password: string;
}
