import { Injectable, NotFoundException } from '@nestjs/common';

import Book from '@gateway/core/book-aggregate/book.aggregate';
import { User } from '@gateway/core/user-aggregate/user.aggregate';
import { PrismaService } from '@gateway/persistence/prisma/prisma.service';
import { BookBasic } from '@gateway/shared/types';

@Injectable()
class BooksService {
  constructor(private readonly _prismaService: PrismaService) {}

  async createBook(userUid: string): Promise<{ uid: string }> {
    const userEntity = await this._prismaService.user.findUnique({
      where: { uid: userUid },
    });
    const user = User.fromPlain(userEntity);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const book = Book.create(user, 'An Untitled Novel', 'A description');

    const { authorUid, id, uid, ...bookData } = book.toPlain();
    const bookEntity = await this._prismaService.book.create({
      data: {
        ...bookData,
        author: { connect: { uid: user.uid } },
      },
    });

    return { uid: bookEntity.uid };
  }

  async getBook(uid: string): Promise<BookBasic> {
    const bookEntity = await this._prismaService.book.findUnique({
      where: { uid },
      include: { author: true },
    });

    if (!bookEntity) {
      throw new NotFoundException('Book not found');
    }

    const book = Book.fromPlain(bookEntity, User.fromPlain(bookEntity.author));

    return book.toBasic();
  }

  async updateTitle(
    userUid: string,
    uid: string,
    title: string,
  ): Promise<void> {
    const bookEntity = await this._prismaService.book.findUnique({
      where: { uid, authorUid: userUid },
      include: { author: true },
    });

    if (!bookEntity) {
      throw new NotFoundException('Book not found');
    }

    const book = Book.fromPlain(bookEntity, User.fromPlain(bookEntity.author));

    book.updateTitle(title);

    await this._prismaService.book.update({
      where: { uid },
      data: { title: book.title },
    });
  }

  async updateDescription(
    userUid: string,
    uid: string,
    description: string,
  ): Promise<void> {
    const bookEntity = await this._prismaService.book.findUnique({
      where: { uid, authorUid: userUid },
      include: { author: true },
    });

    if (!bookEntity) {
      throw new NotFoundException('Book not found');
    }

    const book = Book.fromPlain(bookEntity, User.fromPlain(bookEntity.author));

    book.updateDescription(description);

    await this._prismaService.book.update({
      where: { uid },
      data: { description: book.description },
    });
  }
}

export default BooksService;
