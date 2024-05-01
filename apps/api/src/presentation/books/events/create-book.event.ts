export class CreateBookEvent {
  constructor(
    public readonly title: string,
    public readonly content: string,
    public readonly createdBy: bigint,
  ) {}
}
