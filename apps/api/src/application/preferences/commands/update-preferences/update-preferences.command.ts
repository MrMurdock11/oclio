import { ICommand } from '@nestjs/cqrs';

export class UpdatePreferencesCommand implements ICommand {
  constructor(
    public readonly userId: bigint,
    public readonly preferences: Record<string, string>,
  ) {}
}
