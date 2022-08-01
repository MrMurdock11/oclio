import { AutoMap } from "@automapper/classes";
import {
	Column,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
} from "typeorm";

import { ProductType } from "../core/enums";
import { AuthorEntity } from "../users/entities/author.entity";

@Entity("products")
export class ProductEntity {
	@AutoMap()
	@PrimaryGeneratedColumn()
	id?: number;

	@AutoMap()
	@Column("varchar")
	title: string;

	@AutoMap()
	@Column("varchar", { nullable: true })
	content?: string;

	@AutoMap()
	@Column({ name: "type_id" })
	type: ProductType;

	@AutoMap()
	@Column("timestamp without time zone")
	created: Date;

	@AutoMap()
	@Column("timestamp without time zone")
	edited: Date;

	@AutoMap(() => AuthorEntity)
	@OneToOne(() => AuthorEntity)
	@JoinColumn({ name: "author_id" })
	author: AuthorEntity;

	@AutoMap()
	@Column("boolean", { name: "is_draft" })
	isDraft: boolean;
}
