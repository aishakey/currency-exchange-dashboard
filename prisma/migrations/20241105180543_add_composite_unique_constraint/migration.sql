/*
  Warnings:

  - A unique constraint covering the columns `[baseCurrencyId,targetCurrencyId]` on the table `ExchangeRate` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ExchangeRate_baseCurrencyId_targetCurrencyId_key" ON "ExchangeRate"("baseCurrencyId", "targetCurrencyId");
