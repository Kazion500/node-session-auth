-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "firstName" VARCHAR(50) NOT NULL,
    "lastName" VARCHAR(50) NOT NULL,
    "password" VARCHAR(300) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "sid" VARCHAR NOT NULL,
    "sess" JSON NOT NULL,
    "expire" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("sid")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE INDEX "IDX_session_expire" ON "session"("expire");
