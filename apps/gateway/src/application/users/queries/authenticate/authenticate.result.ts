import { UserBasic } from 'apps/gateway/src/shared/types';

export class AuthenticateResult {
  constructor(
    public readonly token: string,
    public readonly user: UserBasic,
  ) {}
}
