import { UserBasic } from 'apps/gateway/src/types/user';

export class AuthenticateResult {
  constructor(
    public readonly token: string,
    public readonly user: UserBasic,
  ) {}
}
