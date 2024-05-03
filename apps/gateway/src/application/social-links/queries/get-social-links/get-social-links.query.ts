import { IQuery } from '@nestjs/cqrs';

export class GetSocialLinksQuery implements IQuery {
  constructor(public readonly userId: bigint) {}
}
