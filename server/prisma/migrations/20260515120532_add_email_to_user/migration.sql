-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('DINHEIRO', 'CARTAO_CREDITO', 'CARTAO_DEBITO', 'PIX');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "metodoPagamento" "PaymentMethod" NOT NULL DEFAULT 'PIX';
