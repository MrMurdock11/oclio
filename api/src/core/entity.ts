export abstract class Entity<Props, Id> {
	constructor(protected props: Props, protected readonly _id?: Id) {}
}
