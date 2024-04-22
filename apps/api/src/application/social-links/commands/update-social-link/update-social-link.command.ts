export class UpdateSocialLinkCommand {
  constructor(
    public readonly userId: bigint,
    public readonly socialLinkId: bigint,
    public readonly socialLinkUrl: string,
  ) {}
}
