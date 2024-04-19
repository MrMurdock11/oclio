export class UpdateInfoCommand {
  constructor(
    public readonly userId: bigint,
    public readonly fullName: string,
    public readonly bio: string,
  ) {}
}
