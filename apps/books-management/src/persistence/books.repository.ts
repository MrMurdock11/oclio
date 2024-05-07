import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Book as BookModel } from '../core/book-aggregate/book.aggregate';
import { Book } from './schema/book.schema';

@Injectable()
export class BooksRepository {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
  ) {}

  async create(book: BookModel): Promise<void> {
    (await this.bookModel.create(book.toPresentation<Book>())).save();
  }

  async get(id: string): Promise<BookModel> {
    const entity = await this.bookModel.findById(id);
    const result = BookModel.toDomain(entity);
    if (result.isSuccess()) {
      return result.value;
    } else if (result.isFailure()) {
      throw new Error(result.error);
    }
  }

  async getAllByUserId(userId: bigint): Promise<BookModel[]> {
    const entities = await this.bookModel.find({ createdBy: userId });
    const result = BookModel.toDomainArray(entities);
    if (result.isSuccess()) {
      return result.value;
    } else if (result.isFailure()) {
      throw new Error(result.error);
    }
  }
}
