import { Grid, Typography } from "@mui/material";
import { PropsWithChildren } from "react";
import {
  CartesianGrid,
  Legend,
  ComposedChart as RechartsComposedChart,
  Tooltip,
  Label,
  XAxis,
} from "recharts";
import ResponsiveContainerWrapper from "src/ui-components/ResponsiveContainerWrapper";
import { getSidePadding, height } from "src/ui-components/common";

interface RenderXAxisProps {
  dataKey: string;
  label?: string;
  noOfDataPoints: number;
}

export const renderXAxis = ({
  dataKey,
  label,
  noOfDataPoints,
}: RenderXAxisProps) => {
  const sidePadding = getSidePadding(noOfDataPoints);
  return (
    <XAxis
      dataKey={dataKey}
      height={50}
      padding={{ left: sidePadding, right: sidePadding }}
    >
      {label && <Label offset={-20} position="bottom" value={label} />}
    </XAxis>
  );
};

interface ComposedChartProps<T> {
  chartTitle: string;
  dataPoints: T[];
  xAxisDataKey: string;
  barDataKey: string;
  lineDataKey: string;
  barLabel: string;
  lineLabel: string;
}

const ComposedChart = <T,>({
  chartTitle,
  children,
  dataPoints,
}: PropsWithChildren<ComposedChartProps<T>>) => {
  return (
    <Grid
      alignItems="center"
      container
      direction="column"
      justifyContent="center"
    >
      <Grid item sx={{ alignSelf: "center", margin: 2 }}>
        <Typography textTransform="uppercase" variant="h5">
          {chartTitle}
        </Typography>
      </Grid>
      <Grid item sx={{ height: "100%", width: "100%" }}>
        <ResponsiveContainerWrapper height={height} width="100%">
          <RechartsComposedChart data={dataPoints} height={height} width={300}>
            {children}

            <CartesianGrid stroke="#f5f5f5" />
            <Legend />
            <Tooltip />
          </RechartsComposedChart>
        </ResponsiveContainerWrapper>
      </Grid>
    </Grid>
  );
};

export default ComposedChart;
