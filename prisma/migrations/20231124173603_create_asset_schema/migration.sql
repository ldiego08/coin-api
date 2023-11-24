-- CreateTable
CREATE TABLE "Asset" (
    "id" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "priceUsd" DOUBLE PRECISION NOT NULL,
    "marketCapUsd" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("id")
);
