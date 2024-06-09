import {
  Controller,
  Get,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';

import { BooksManagementService } from '@oclio/clients/books-management/books-management.service';

@Controller({
  path: 'metadata',
  version: '1',
})
export class MetadataController {
  constructor(
    private readonly _booksManagementService: BooksManagementService,
  ) {}

  @Get('/categories-and-genres')
  async getCategoriesAndGenres() {
    try {
      const genres =
        await this._booksManagementService.getCategoriesAndGenres();
      return genres;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred while getting categories and genres',
      );
    }
  }
}
