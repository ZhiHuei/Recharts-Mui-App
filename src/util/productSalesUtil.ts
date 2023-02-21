import { ProductSalesRevenue } from "src/components/ProductSales";

const startYear = 2011;
type IAggregation = {
  totalQuantityP1: number;
  totalQuantityP2: number;
  totalQuantityP3: number;
  totalQuantityP4: number;
  totalRevenueP1: number;
  totalRevenueP2: number;
  totalRevenueP3: number;
  totalRevenueP4: number;
};

const initialValue: IAggregation = {
  totalQuantityP1: 0,
  totalQuantityP2: 0,
  totalQuantityP3: 0,
  totalQuantityP4: 0,
  totalRevenueP1: 0.0,
  totalRevenueP2: 0.0,
  totalRevenueP3: 0.0,
  totalRevenueP4: 0.0,
};
export const aggregateProductSalesByYear = (data: ProductSalesRevenue[]) => {
  // initiliase the years
  const aggregatedData = new Map<number, IAggregation>();
  
  for (var i = 0; i < 12; i++) {
    aggregatedData.set(startYear + i, initialValue);
  }

  data.forEach((product) => {
    const year = product.date.getFullYear();
    const exisitngValue = aggregatedData.get(year);
    if (exisitngValue) {
      if (exisitngValue) {
        const toUpdate: IAggregation = {
          totalQuantityP1: exisitngValue.totalQuantityP1 + product.quantityP1,
          totalQuantityP2: exisitngValue.totalQuantityP2 + product.quantityP2,
          totalQuantityP3: exisitngValue.totalQuantityP3 + product.quantityP3,
          totalQuantityP4: exisitngValue.totalQuantityP4 + product.quantityP4,
          totalRevenueP1: exisitngValue.totalRevenueP1 + product.revenueP1,
          totalRevenueP2: exisitngValue.totalRevenueP2 + product.revenueP2,
          totalRevenueP3: exisitngValue.totalRevenueP3 + product.revenueP3,
          totalRevenueP4: exisitngValue.totalRevenueP4 + product.revenueP4,
        };
        aggregatedData.set(year, toUpdate);
      }
    }
  });

  return [...aggregatedData].map(
    ([
      date,
      {
        totalQuantityP1,
        totalQuantityP2,
        totalQuantityP3,
        totalQuantityP4,
        totalRevenueP1,
        totalRevenueP2,
        totalRevenueP3,
        totalRevenueP4,
      },
    ]) => ({
      date,
      totalQuantityP1,
      totalQuantityP2,
      totalQuantityP3,
      totalQuantityP4,
      totalRevenueP1: totalRevenueP1.toFixed(2),
      totalRevenueP2: totalRevenueP2.toFixed(2),
      totalRevenueP3: totalRevenueP3.toFixed(2),
      totalRevenueP4: totalRevenueP4.toFixed(2),
    })
  );
};
