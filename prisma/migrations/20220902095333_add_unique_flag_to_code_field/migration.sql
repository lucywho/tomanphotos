/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Photo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Photo_code_key" ON "Photo"("code");
