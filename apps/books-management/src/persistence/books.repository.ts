import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Book } from '../core/book-aggregate/book.aggregate';
import { Chapter } from '../core/book-aggregate/chapter.model';
import { Book as BookDocument } from './schema/book.schema';
import { Chapter as ChapterDocument } from './schema/chapter.schema';

@Injectable()
export class BooksRepository {
  constructor(
    @InjectModel(BookDocument.name)
    private readonly bookModel: Model<BookDocument>,
  ) {}

  async create(book: Book): Promise<void> {
    (await this.bookModel.create(book.toPresentation<BookDocument>())).save();
  }

  async get(id: string, userId?: bigint): Promise<Book> {
    const entity = await this.bookModel
      .findOne({ _id: id, createdBy: userId })
      .exec();
    if (!entity) {
      throw new NotFoundException(`Book not found with ID ${id}`);
    }
    return Book.toDomain(entity);
  }

  async getAll(userId: bigint): Promise<Book[]> {
    const entities = await this.bookModel.find({ createdBy: userId }).exec();
    return entities.map((entity) => Book.toDomain(entity));
  }

  async createChapter(bookId: string, chapter: Chapter): Promise<void> {
    const createResult = await this.bookModel
      .updateOne(
        { _id: bookId },
        { $push: { chapters: chapter.toPersistence() } },
      )
      .exec();

    if (createResult.matchedCount === 0) {
      throw new NotFoundException(
        `Book not found with ID ${bookId} or user mismatch`,
      );
    }
  }

  async updateChapter(bookId: string, chapter: Chapter): Promise<void> {
    const chapterDocument = chapter.toPersistence<ChapterDocument>();
    const updateResult = await this.bookModel
      .updateOne(
        { _id: bookId, 'chapters._id': chapter.id },
        {
          $set: {
            'chapters.$.title': chapterDocument.title,
            'chapters.$.text': chapterDocument.text,
          },
        },
      )
      .exec();

    if (updateResult.matchedCount === 0) {
      throw new NotFoundException(
        `Book not found with ID ${bookId} or user mismatch, or chapter ID ${chapter.id} not found`,
      );
    }
  }

  async deleteChapter(bookId: string, chapterId: string): Promise<void> {
    const updateResult = await this.bookModel
      .updateOne({ _id: bookId }, { $pull: { chapters: { _id: chapterId } } })
      .exec();

    if (updateResult.matchedCount === 0) {
      throw new NotFoundException(
        `Book not found with ID ${bookId} or user mismatch, or chapter ID ${chapterId} not found`,
      );
    }
  }
}
