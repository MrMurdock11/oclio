export const enum EnvKey {
  ConnectionString = 'MONGODB_CONNECTION_STRING',
  Database = 'MONGODB_NAME',
  BooksManagementPort = 'BOOKS_MANAGEMENT_PORT',
}

export const enum BooksManagementPattern {
  CreateBook = 'create-book',
  GetBook = 'get-book',
  GetBooks = 'get-books',
}

export const enum Microservice {
  BooksManagement = 'books-management',
}
