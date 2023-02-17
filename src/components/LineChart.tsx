import { Grid, Typography } from "@mui/material";
import { format } from "date-fns";
import { PropsWithChildren, ReactElement } from "react";
import {
  CartesianGrid,
  Label,
  Legend,
  LineChart as RechartsLineChart,
  XAxis,
  YAxis,
} from "recharts";
import { AxisInterval, BaseAxisProps } from "recharts/types/util/types";
import ResponsiveContainerWrapper from "./ResponsiveContainerWrapper";

const height = 600;

const getSidePadding = (noItems: number): number =>
  350 / (noItems > 1 ? noItems - 1 : 1) + 5;

const tick = { fontSize: 12 };

interface RenderXAxisProps
  extends Pick<BaseAxisProps, "tickLine" | "tickFormatter"> {
  customizedAxisTick?: (tickProps: any) => ReactElement;
  dataKey: string;
  interval?: AxisInterval;
  label?: string;
  noOfDataPoints: number;
}

export const renderXAxis = ({
  dataKey,
  interval,
  label,
  noOfDataPoints,
}: RenderXAxisProps) => {
  const sidePadding = getSidePadding(noOfDataPoints);
  return (
    <XAxis
      dataKey={dataKey}
      interval={interval}
      height={50}
      padding={{ left: sidePadding, right: sidePadding }}
      tick={tick}
      scale="auto"
      tickFormatter={(timestamp) => format(new Date(timestamp), "MM/dd/yyyy")}
    >
      {label && <Label offset={-20} position="bottom" value={label} />}
    </XAxis>
  );
};

interface RenderYAxisProps {
  dataKey: string;
  label?: string;
}

export const renderYAxis = ({ dataKey, label }: RenderYAxisProps) => (
  <YAxis dataKey={dataKey}>
    {label && (
      <Label
        angle={-90}
        offset={-10}
        position="left"
        style={{ textAnchor: "middle" }}
        value={label}
      />
    )}
  </YAxis>
);

interface LineChartProps<T> {
  chartTitle: string;
  dataPoints: T[];
}

const LineChart = <T,>({
  chartTitle,
  children,
  dataPoints,
}: PropsWithChildren<LineChartProps<T>>) => {
  return (
    <Grid
      alignItems="center"
      container
      direction="column"
      justifyContent="center"
    >
      <Grid item sx={{ alignSelf: "center" }}>
        <Typography textTransform="uppercase" variant="h5">
          {chartTitle}
        </Typography>
      </Grid>
      <Grid item sx={{ height: "100%", width: "100%" }}>
        <ResponsiveContainerWrapper height={height} width="100%">
          <RechartsLineChart data={dataPoints} height={height} width={200}>
            {children}
            <CartesianGrid strokeDasharray="5 5" />
            <Legend layout="vertical" verticalAlign="middle" align="right" />
          </RechartsLineChart>
        </ResponsiveContainerWrapper>
      </Grid>
    </Grid>
  );
};

export default LineChart;
