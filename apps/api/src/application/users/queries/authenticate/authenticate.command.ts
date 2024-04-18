export class AuthenticateQuery {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}
