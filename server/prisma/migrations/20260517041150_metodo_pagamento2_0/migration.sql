/*
  Warnings:

  - You are about to drop the column `tipodoPagamento` on the `Order` table. All the data in the column will be lost.
  - The `metodoPagamento` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('DINHEIRO', 'dinheiro', 'CARTAO_CREDITO', 'cartao_credito', 'CARTAO_DEBITO', 'cartao_debito', 'PIX', 'pix');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "tipodoPagamento",
DROP COLUMN "metodoPagamento",
ADD COLUMN     "metodoPagamento" "PaymentMethod" NOT NULL DEFAULT 'PIX';
