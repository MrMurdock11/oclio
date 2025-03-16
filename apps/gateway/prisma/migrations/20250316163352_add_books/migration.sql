-- CreateTable
CREATE TABLE "books" (
    "id" BIGSERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "title" VARCHAR(256) NOT NULL,
    "description" TEXT,
    "author_uid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "books_uid_key" ON "books"("uid");

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_author_uid_fkey" FOREIGN KEY ("author_uid") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
