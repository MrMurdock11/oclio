export class RearrangeChapterPayload {
  constructor(
    public readonly bookId: string,
    public readonly userId: string,
    public readonly from: number,
    public readonly to: number,
  ) {}
}
