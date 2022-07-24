import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" })
export class UserEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column("varchar", { name: "username", nullable: false })
	username: string;

	@Column("varchar", { name: "lastname" })
	lastName: string | null;

	@Column("varchar", { name: "firstname" })
	firstName: string | null;

	@Column("varchar", { nullable: false })
	email: string;

	@Column("varchar", { nullable: false })
	password: string;
}
