export class UnpublishBookPayload {
  constructor(
    public readonly bookId: string,
    public readonly userId: string,
  ) {}
}
