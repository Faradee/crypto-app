/*
  Warnings:

  - The primary key for the `Transaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `transactionId` was added to the `Transaction` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_pkey",
ADD COLUMN     "transactionId" TEXT NOT NULL,
ADD CONSTRAINT "Transaction_pkey" PRIMARY KEY ("transactionId");
