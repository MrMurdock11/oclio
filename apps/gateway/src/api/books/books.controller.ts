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

  @Get()
  @HttpCode(HttpStatus.OK)
  async getBooks(@CurrentUser() user: UserBasic): Promise<BookBasic[]> {
    return this._booksService.getBooks(user.uid);
  }

  @Get(':uid')
  @HttpCode(HttpStatus.OK)
  async getBook(@Param('uid') uid: string): Promise<BookBasic> {
    return this._booksService.getBook(uid);
  }

  @Put(':uid/title')
  @HttpCode(HttpStatus.OK)
  async updateTitle(
    @CurrentUser() user: UserBasic,
    @Param('uid') uid: string,
    @Body() body: { title: string },
  ): Promise<void> {
    return this._booksService.updateTitle(user.uid, uid, body.title);
  }

  @Put(':uid/description')
  @HttpCode(HttpStatus.OK)
  async updateDescription(
    @CurrentUser() user: UserBasic,
    @Param('uid') uid: string,
    @Body() body: { description: string },
  ): Promise<void> {
    return this._booksService.updateDescription(
      user.uid,
      uid,
      body.description,
    );
  }

  @Get(':uid/access')
  @HttpCode(HttpStatus.OK)
  async checkBookAccess(
    @CurrentUser() user: UserBasic,
    @Param('uid') uid: string,
  ): Promise<{ hasAccess: boolean }> {
    return {
      hasAccess: await this._booksService.checkBookAccess(user.uid, uid),
    };
  }
}

export default BooksController;
