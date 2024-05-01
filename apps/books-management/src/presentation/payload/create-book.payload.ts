export class CreateBookPayload {
  constructor(
    public readonly title: string,
    public readonly createdBy: bigint,
  ) {}
}
