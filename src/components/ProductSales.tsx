import { FC } from "react";
import useReadCSV from "src/hook/useReadCSV";
import { parse } from "date-fns";
import { aggregateProductSalesByYear } from "src/util/productSalesUtil";
import ComposedChart, { renderXAxis } from "src/ui-components/ComposedChart";
import { Bar, Label, Line, YAxis } from "recharts";

export type ProductSalesRevenue = {
  date: Date;
  quantityP1: number;
  quantityP2: number;
  quantityP3: number;
  quantityP4: number;

  revenueP1: number;
  revenueP2: number;
  revenueP3: number;
  revenueP4: number;
};

const CSVHeader: Record<string, string> = {
  date: "Date",
  quantityP1: "Q-P1",
  quantityP2: "Q-P2",
  quantityP3: "Q-P3",
  quantityP4: "Q-P4",
  revenueP1: "S-P1",
  revenueP2: "S-P2",
  revenueP3: "S-P3",
  revenueP4: "S-P4",
};

const ProductSales: FC<{}> = () => {
  const data = useReadCSV<ProductSalesRevenue>("/data/statsfinal.csv", {
    transformHeader: (header: string) =>
      Object.keys(CSVHeader).find(
        (key) => CSVHeader[key].toLowerCase() === header.toLowerCase()
      ) || header,

    transform: (value, header) => {
      if (header !== "date") {
        return Number(value);
      }
      return parse(value, "dd-MM-yyyy", new Date());
    },
  });

  if (!data) return <></>;

  const productSalesByYear = aggregateProductSalesByYear(data);
  console.log("productSalesByYear", productSalesByYear);

  return (
    <ComposedChart
      chartTitle={"Product Sales and Revenue of a Company "}
      dataPoints={productSalesByYear}
      barDataKey={"totalQuantityP1"}
      lineDataKey={"totalRevenueP1"}
      barLabel={""}
      lineLabel={""}
      xAxisDataKey={""}
    >
      {renderXAxis({
        dataKey: "date",
        label: "Year",
        noOfDataPoints: productSalesByYear.length,
      })}
      <YAxis yAxisId="left" width={80}>
        <Label
          angle={-90}
          offset={-5}
          position="left"
          style={{ textAnchor: "middle" }}
          value="Quantity"
        />
      </YAxis>
      <YAxis yAxisId="right" orientation="right" width={80}>
        <Label
          angle={-90}
          offset={-10}
          position="right"
          style={{ textAnchor: "middle" }}
          value="Revenue"
        />
      </YAxis>
      <Bar
        yAxisId="left"
        dataKey="totalQuantityP1"
        barSize={20}
        fill="rgb(49, 143, 181)"
      />
      <Bar
        yAxisId="left"
        dataKey="totalQuantityP2"
        barSize={20}
        fill="#7a89dd"
      />
      <Bar
        yAxisId="left"
        dataKey="totalQuantityP3"
        barSize={20}
        fill="#5F9DC28C"
      />
      <Bar
        yAxisId="left"
        dataKey="totalQuantityP4"
        barSize={20}
        fill="#6F6F6F"
      />
      <Line
        yAxisId="right"
        type="monotone"
        dataKey="totalRevenueP1"
        stroke="rgb(49, 143, 181)"
        strokeWidth={3}
      />
      <Line
        yAxisId="right"
        type="monotone"
        dataKey="totalRevenueP2"
        stroke="#7a89dd"
        strokeWidth={3}
      />
      <Line
        yAxisId="right"
        type="monotone"
        dataKey="totalRevenueP3"
        stroke="#5F9DC28C"
        strokeWidth={3}
      />
      <Line
        yAxisId="right"
        type="monotone"
        dataKey="totalRevenueP4"
        stroke="#6F6F6F"
        strokeWidth={2}
      />
    </ComposedChart>
  );
};

export default ProductSales;
