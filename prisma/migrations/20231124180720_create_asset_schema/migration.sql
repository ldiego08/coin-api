-- CreateTable
CREATE TABLE "AssetMarket" (
    "id" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "priceUsd" DOUBLE PRECISION NOT NULL,
    "marketCapUsd" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "AssetMarket_pkey" PRIMARY KEY ("id","date")
);
