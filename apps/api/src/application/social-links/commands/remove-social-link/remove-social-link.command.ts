export class RemoveSocialLinkCommand {
  constructor(
    public readonly userId: bigint,
    public readonly socialLinkId: bigint,
  ) {}
}
