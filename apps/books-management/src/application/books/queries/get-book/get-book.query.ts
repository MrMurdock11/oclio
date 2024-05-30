export class GetBookQuery {
  constructor(
    public readonly bookId: string,
    public readonly userId: bigint,
  ) {}
}
