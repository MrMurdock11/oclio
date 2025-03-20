import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { AccessTokenGuard, CurrentUser } from '@common/auth';
import BooksService from '@gateway/application/services/books.service';
import { BookBasic, UserBasic } from '@gateway/shared/types';

@UseGuards(AccessTokenGuard)
@Controller({ path: 'books', version: '1' })
class BooksController {
  constructor(private readonly _booksService: BooksService) {}

  @Post('new')
  @HttpCode(HttpStatus.CREATED)
  async createBook(@CurrentUser() user: UserBasic): Promise<{ uid: string }> {
    return this._booksService.createBook(user.uid);
  }

  @Get(':uid')
  @HttpCode(HttpStatus.OK)
  async getBook(@Param('uid') uid: string): Promise<BookBasic> {
    return this._booksService.getBook(uid);
  }

  @Put(':uid/title')
  @HttpCode(HttpStatus.OK)
  async updateTitle(
    @Param('uid') uid: string,
    @Body() body: { title: string },
  ): Promise<void> {
    return this._booksService.updateTitle(uid, body.title);
  }

  @Put(':uid/description')
  @HttpCode(HttpStatus.OK)
  async updateDescription(
    @Param('uid') uid: string,
    @Body() body: { description: string },
  ): Promise<void> {
    return this._booksService.updateDescription(uid, body.description);
  }
}

export default BooksController;
