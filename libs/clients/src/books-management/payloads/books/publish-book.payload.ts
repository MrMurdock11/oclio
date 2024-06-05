export class PublishBookPayload {
  constructor(
    public readonly bookId: string,
    public readonly userId: string,
  ) {}
}
