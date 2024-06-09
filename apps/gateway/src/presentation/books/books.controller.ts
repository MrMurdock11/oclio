import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { BooksManagementService } from '@oclio/clients/books-management/books-management.service';
import {
  CreateBookPayload,
  CreateChapterPayload,
  DeleteBookPayload,
  DeleteBooksPayload,
  DeleteChapterPayload,
  GetBookPayload,
  GetBooksPayload,
  PublishBookPayload,
  RearrangeChapterPayload,
  SaveBookDetailsPayload,
  UnpublishBookPayload,
  UpdateChapterPayload,
} from '@oclio/clients/books-management/payloads';
import { AccessTokenGuard, ContextUser, CurrentUser } from '@oclio/common/auth';

import { BookSaveDetailsDto } from './dto/book-save-details.dto';
import { ChapterRearrangeDto } from './dto/chapter-rearrange.dto';
import { ChapterUpdateDto } from './dto/chapter-update.dto';

@UseGuards(AccessTokenGuard)
@Controller({
  path: 'books',
  version: '1',
})
export class BooksController {
  constructor(
    private readonly _booksManagementService: BooksManagementService,
  ) {}

  // #region Books

  @Post()
  async create(@CurrentUser() user: ContextUser, @Body('title') title: string) {
    try {
      await this._booksManagementService.createBook(
        new CreateBookPayload(title, user.id.toString()),
      );
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred while creating the book',
      );
    }
  }

  @Get('/:bookId')
  async get(@Param('bookId') bookId: string, @CurrentUser() user: ContextUser) {
    try {
      const book = await this._booksManagementService.getBook(
        new GetBookPayload(bookId, user.id.toString()),
      );

      return book;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred while getting the book',
      );
    }
  }

  @Get()
  async getAll(@CurrentUser() user: ContextUser) {
    try {
      const books = await this._booksManagementService.getAllBooks(
        new GetBooksPayload(user.id.toString()),
      );

      return books;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred while getting the books',
      );
    }
  }

  @Delete('/:bookId')
  async deleteBook(
    @Param('bookId') bookId: string,
    @CurrentUser() user: ContextUser,
  ) {
    try {
      await this._booksManagementService.deleteBook(
        new DeleteBookPayload(bookId, user.id.toString()),
      );
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred while deleting the book',
      );
    }
  }

  @Delete()
  async deleteBooks(
    @Body('bookIds') bookIds: string[],
    @CurrentUser() user: ContextUser,
  ) {
    try {
      await this._booksManagementService.deleteBooks(
        new DeleteBooksPayload(bookIds, user.id.toString()),
      );
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred while deleting the book',
      );
    }
  }

  @Put('/:bookId/publish')
  async publishBook(
    @Param('bookId') bookId: string,
    @CurrentUser() user: ContextUser,
  ): Promise<void> {
    try {
      await this._booksManagementService.publishBook(
        new PublishBookPayload(bookId, user.id.toString()),
      );
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred while publish the book',
      );
    }
  }

  @Put('/:bookId/unpublish')
  async unpublishBook(
    @Param('bookId') bookId: string,
    @CurrentUser() user: ContextUser,
  ): Promise<void> {
    try {
      await this._booksManagementService.unpublishBook(
        new UnpublishBookPayload(bookId, user.id.toString()),
      );
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred while unpublish the book',
      );
    }
  }

  @Post('/:bookId/details')
  async saveBookDetails(
    @Param('bookId') bookId: string,
    @Body() body: BookSaveDetailsDto,
    @CurrentUser() user: ContextUser,
  ): Promise<void> {
    const { category, genrePath, volume } = body;
    try {
      await this._booksManagementService.saveBookDetails(
        new SaveBookDetailsPayload(
          bookId,
          user.id.toString(),
          category,
          genrePath,
          volume,
        ),
      );
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred while saving the book details',
      );
    }
  }

  // #endregion

  // #region Chapters

  @Post('/:id/chapters')
  async createChapter(
    @Param('id') bookId: string,
    @CurrentUser() user: ContextUser,
    @Body('title') title: string,
  ): Promise<void> {
    try {
      await this._booksManagementService.createChapter(
        new CreateChapterPayload(bookId, user.id.toString(), title),
      );
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred while creating the chapter',
      );
    }
  }

  @Put('/:bookId/chapters/:chapterId')
  async updateChapter(
    @Param('bookId') bookId: string,
    @Param('chapterId') chapterId: string,
    @CurrentUser() user: ContextUser,
    @Body() body: ChapterUpdateDto,
  ): Promise<void> {
    const { title, text } = body;

    try {
      await this._booksManagementService.updateChapter(
        new UpdateChapterPayload(
          bookId,
          chapterId,
          user.id.toString(),
          title,
          text,
        ),
      );
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred while updating the chapter',
      );
    }
  }

  @Delete('/:bookId/chapters/:chapterId')
  async deleteChapter(
    @Param('bookId') bookId: string,
    @Param('chapterId') chapterId: string,
    @CurrentUser() user: ContextUser,
  ): Promise<void> {
    try {
      await this._booksManagementService.deleteChapter(
        new DeleteChapterPayload(bookId, chapterId, user.id.toString()),
      );
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred while deleting the chapter',
      );
    }
  }

  @Post('/:bookId/chapters/rearrange')
  async rearrangeChapter(
    @Param('bookId') bookId: string,
    @CurrentUser() user: ContextUser,
    @Body() body: ChapterRearrangeDto,
  ): Promise<void> {
    const { from, to } = body;

    try {
      await this._booksManagementService.rearrangeChapter(
        new RearrangeChapterPayload(bookId, user.id.toString(), from, to),
      );
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred while rearranging the chapter',
      );
    }
  }

  // #endregion
}
