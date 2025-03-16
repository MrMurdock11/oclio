import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AccessTokenGuard, CurrentUser } from '@common/auth';
import BooksService from '@gateway/application/services/books.service';
import { UserBasic } from '@gateway/shared/types';

@UseGuards(AccessTokenGuard)
@Controller({ path: 'books', version: '1' })
class BooksController {
  constructor(private readonly _booksService: BooksService) {}

  @Post('new')
  @HttpCode(HttpStatus.CREATED)
  async createBook(@CurrentUser() user: UserBasic): Promise<{ uid: string }> {
    return this._booksService.createBook(user.uid);
  }
}

export default BooksController;
