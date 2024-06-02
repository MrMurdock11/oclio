export class DeleteChapterPayload {
  constructor(
    public readonly bookId: string,
    public readonly chapterId: string,
    public readonly userId: string,
  ) {}
}
