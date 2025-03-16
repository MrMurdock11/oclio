import { Injectable, NotFoundException } from '@nestjs/common';

import Book from '@gateway/core/book-aggregate/book.aggregate';
import { User } from '@gateway/core/user-aggregate/user.aggregate';
import { PrismaService } from '@gateway/persistence/prisma/prisma.service';

@Injectable()
class BooksService {
  constructor(private readonly _prismaService: PrismaService) {}

  async createBook(userUid: string): Promise<{ uid: string }> {
    console.log('getting user by uid', userUid);
    const userEntity = await this._prismaService.user.findUnique({
      where: { uid: userUid },
    });
    const user = User.fromPlain(userEntity);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    console.log('creating book');
    const book = Book.create(user, 'An Untitled Novel', 'A description');

    console.log('creating book entity');
    const { authorUid, id, uid, ...bookData } = book.toPlain();
    const bookEntity = await this._prismaService.book.create({
      data: {
        ...bookData,
        author: { connect: { uid: user.uid } },
      },
    });

    console.log('book created', bookEntity.uid);
    return { uid: bookEntity.uid };
  }
}

export default BooksService;
