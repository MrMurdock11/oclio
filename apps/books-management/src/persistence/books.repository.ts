import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { CreateBookDto } from './dtos/create-book.dto';
import { Book } from './schema/book.schema';

@Injectable()
export class BooksRepository {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
  ) {}

  async create(dto: CreateBookDto): Promise<void> {
    const newBook = new this.bookModel(dto);
    await newBook.save();
  }
}
