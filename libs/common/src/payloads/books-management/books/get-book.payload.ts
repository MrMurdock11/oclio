export class GetBookPayload {
  constructor(
    public readonly bookId: string,
    public readonly userId: string,
  ) {}
}
