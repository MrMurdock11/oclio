export const enum EnvKey {
  ConnectionString = 'MONGODB_CONNECTION_STRING',
  Database = 'MONGODB_NAME',
  BooksManagementHost = 'BOOKS_MANAGEMENT_HOST',
  BooksManagementPort = 'BOOKS_MANAGEMENT_PORT',
}

export const enum BooksManagementPattern {
  CreateBook = 'books-management.create-book',
  GetBook = 'books-management.get-book',
  GetBooks = 'books-management.get-books',
  DeleteBook = 'books-management.delete-book',
  DeleteBooks = 'books-management.delete-books',
  PublishBook = 'books-management.publish-book',
  UnpublishBook = 'books-management.unpublish-book',
  CreateChapter = 'books-management.create-chapter',
  GetChapter = 'books-management.get-chapter',
  UpdateChapter = 'books.management.update-chapter',
  DeleteChapter = 'books-management.delete-chapter',
}

export const enum Microservice {
  BooksManagement = 'books-management',
}
