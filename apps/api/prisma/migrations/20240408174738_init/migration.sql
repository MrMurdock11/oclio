-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "firstName" VARCHAR(35) NOT NULL,
    "middleName" VARCHAR(35),
    "lastName" VARCHAR(35) NOT NULL,
    "bio" TEXT,
    "email" VARCHAR(256) NOT NULL,
    "hashedPassword" VARCHAR(72) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "photos" (
    "id" BIGSERIAL NOT NULL,
    "base64" TEXT,
    "userId" BIGINT NOT NULL,

    CONSTRAINT "photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social_links" (
    "id" BIGSERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "userId" BIGINT NOT NULL,
    "typeId" INTEGER NOT NULL,

    CONSTRAINT "social_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social_link_types" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(125) NOT NULL,

    CONSTRAINT "social_link_types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social_links" ADD CONSTRAINT "social_links_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social_links" ADD CONSTRAINT "social_links_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "social_link_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
