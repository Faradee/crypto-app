/*
  Warnings:

  - You are about to drop the column `price` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `cash` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "price",
ADD COLUMN     "cash" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION;
