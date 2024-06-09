import { ICommand } from '@nestjs/cqrs';

import { Category } from '../../../../shared/enums';

export class SaveBookDetailsCommand implements ICommand {
  constructor(
    public readonly bookId: string,
    public readonly userId: bigint,
    public readonly category?: Category,
    public readonly genrePaths?: string[],
    public readonly volume?: number,
  ) {}
}
