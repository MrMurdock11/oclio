export class DeleteBooksPayload {
  constructor(
    public readonly bookIds: string[],
    public readonly userId: string,
  ) {}
}
