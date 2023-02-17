import { Grid, Typography } from "@mui/material";
import { PropsWithChildren, ReactElement } from "react";
import { Label, LineChart as RechartsLineChart, XAxis, YAxis } from "recharts";
import { AxisInterval, BaseAxisProps } from "recharts/types/util/types";
import ResponsiveContainerWrapper from "./ResponsiveContainerWrapper";

const height = 700;

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
      padding={{ left: sidePadding, right: sidePadding }}
      tick={tick}
    >
      {label && <Label offset={4} position="bottom" value={label} />}
    </XAxis>
  );
};

interface RenderYAxisProps {
  dataKey: string;
  label: string;
}

export const renderYAxis = ({ dataKey, label }: RenderYAxisProps) => (
  <YAxis allowDecimals={false} dataKey={dataKey} tick={tick}>
    <Label
      angle={-90}
      offset={-25}
      position="left"
      style={{ textAnchor: "middle" }}
      value={label}
    />
  </YAxis>
);

interface LineChartProps<T> {
  chartTitle: string;
  dataKey: string;
  dataPoints: T[];
}

const LineChart = <T,>({
  chartTitle,
  children,
  dataKey,
  dataPoints,
}: PropsWithChildren<LineChartProps<T>>) => {
  return (
    <Grid
      alignItems="center"
      container
      direction="column"
      justifyContent="center"
    >
      <Grid item sx={{ alignSelf: "flex-start" }}>
        <Typography textTransform="uppercase" variant="h6">
          {chartTitle}
        </Typography>
      </Grid>
      <Grid item sx={{ height: "100%", width: "100%" }}>
        <ResponsiveContainerWrapper height={height} width="99%">
          <RechartsLineChart data={dataPoints} height={height} width={200}>
            {children}
            {/* <Line type="monotone" dataKey="pv" stroke="#8884d8" />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
          </RechartsLineChart>
        </ResponsiveContainerWrapper>
      </Grid>
    </Grid>
  );
};

export default LineChart;
