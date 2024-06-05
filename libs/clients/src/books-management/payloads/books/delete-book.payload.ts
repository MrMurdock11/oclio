export class DeleteBookPayload {
  constructor(
    public readonly bookId: string,
    public readonly userId: string,
  ) {}
}
