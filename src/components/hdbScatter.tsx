import { Grid, Typography } from "@mui/material";
import { FC } from "react";
import {
  CartesianGrid,
  Label,
  Legend,
  ReferenceLine,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useReadCSV from "src/hook/useReadCSV";
import _ from "lodash";
import regression from "regression";
import ResponsiveContainerWrapper from "src/ui-components/ResponsiveContainerWrapper";

export type PriceData = {
  year: string;
  estate: string;
  resalePrice: number;
  room4Rental: number;
  room3Rental: number;
};

const HdbScatter: FC<{}> = () => {
  const resaleData =
    useReadCSV<PriceData>("/data/hdb-resale-data.csv", {
      transformHeader: (header, index) => {
        if (header === "resale_price") {
          return "resalePrice";
        }
        return header;
      },
    }) || [];

  const rental4roomData =
    useReadCSV<PriceData>("/data/hdb-4room-rental.csv", {
      transformHeader: (header, index) => {
        if (header === "room4") {
          return "room4Rental";
        }
        return header;
      },
    }) || [];

  const rental3roomData =
    useReadCSV<PriceData>("/data/hdb-3room-rental.csv", {
      transformHeader: (header, index) => {
        if (header === "room3") {
          return "room3Rental";
        }
        return header;
      },
    }) || [];

  // Get Mature estate property price
  const matureResale = resaleData
    .filter((data) => data.estate === "mature")
    .map((value) => ({
      ...value,
      room4Rental: 0,
      room3Rental: 0,
      resalePrice: Math.floor(value.resalePrice),
    }));

  const mature4RoomRental = rental4roomData
    .filter((data) => data.estate === "mature")
    .map((value) => ({
      ...value,
      resalePrice: 0,
      room3Rental: 0,
      room4Rental: Math.floor(value.room4Rental),
    }));

  const mature3RoomRental = rental3roomData
    .filter((data) => data.estate === "mature")
    .map((value) => ({
      ...value,
      resalePrice: 0,
      room4Rental: 0,
      room3Rental: Math.floor(value.room3Rental),
    }));

  const selectedYears = [
    "2007",
    "2008",
    "2009",
    "2010",
    "2011",
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
  ];
  const mergedData = [
    ...matureResale,
    ...mature4RoomRental,
    ...mature3RoomRental,
  ]
    .reduce((acc: PriceData[], current: PriceData) => {
      const year = current.year;
      const existingData = acc.find((d: PriceData) => d.year === year);
      if (existingData) {
        existingData.resalePrice += current.resalePrice || 0;
        existingData.room4Rental += current.room4Rental || 0;
        existingData.room3Rental += current.room3Rental || 0;
      } else {
        acc.push(current);
      }
      return acc;
    }, [])
    .filter((v) => selectedYears.includes(v.year));

  // Group data by year and aggregate resalePrice and room4Rental columns
  const grouped4RoomData = _(mergedData)
    .groupBy("year")
    .map((values, year) => ({
      year,
      resalePrice: _.sumBy(values, "resalePrice"),
      room4Rental: _.sumBy(values, "room4Rental"),
    }))
    .value();
  const grouped3RoomData = _(mergedData)
    .groupBy("year")
    .map((values, year) => ({
      year,
      resalePrice: _.sumBy(values, "resalePrice"),
      room3Rental: _.sumBy(values, "room3Rental"),
    }))
    .value();

  const regressionData = mergedData.map(
    ({ room3Rental, room4Rental, resalePrice }) => [
      resalePrice / 100.0,
      (room4Rental + room3Rental) / 2,
    ]
  );
  console.log(regressionData);

  const result = regression.linear(regressionData as any);
  const trendline = result.points.map(([x, y]) => ({ x: x * 100, y }));
  console.log(trendline);
  console.log(result);

  return (
    <Grid
      alignItems="center"
      container
      direction="column"
      justifyContent="center"
    >
      <Grid item sx={{ alignSelf: "center", margin: 2 }}>
        <Typography textTransform="uppercase" variant="h5">
          Resale Prices vs Rental Prices in Mature Estates
        </Typography>
      </Grid>
      <Grid item sx={{ height: "100%", width: "100%" }}>
        <ResponsiveContainerWrapper height={500} width="100%">
          <ScatterChart
            width={300}
            margin={{ top: 20, right: 20, bottom: 20, left: 50 }}
          >
            <CartesianGrid />
            <XAxis
              type="number"
              dataKey="resalePrice"
              domain={[250000, 600000]}
            >
              <Label offset={5} position="bottom" value="Resale Price (SGD)" />
            </XAxis>
            <YAxis yAxisId="left" domain={[500, 3000]}>
              <Label
                angle={-90}
                offset={-20}
                position="insideLeft"
                style={{ textAnchor: "middle" }}
                value="Average Resale Price (SGD)"
              />
            </YAxis>
            <YAxis yAxisId="right" orientation="right" domain={[500, 3000]}>
              <Label
                angle={90}
                offset={0}
                position="insideRight"
                style={{ textAnchor: "middle" }}
                value="Rental (SGD)"
              />
            </YAxis>
            <Tooltip/>
            <ReferenceLine
              yAxisId="left"
              stroke="red"
              ifOverflow="hidden"
              alwaysShow
              isFront
              segment={[trendline[0], trendline[trendline.length - 1]]}
            />
            <Legend
              wrapperStyle={{ position: "relative", margin: 10 }}
              align="right"
              verticalAlign="bottom"
            />
            <Scatter
              name="4 Room Rental"
              data={grouped4RoomData}
              type="number"
              fill="#8884d8"
              dataKey="room4Rental"
              yAxisId="left"
              // line
              shape="circle"
            />
            <Scatter
              name="3 Room Rental"
              dataKey="room3Rental"
              data={grouped3RoomData}
              type="number"
              fill="#82ca9d"
              // line
              shape="circle"
              yAxisId="right"
            />
          </ScatterChart>
        </ResponsiveContainerWrapper>
      </Grid>
    </Grid>
  );
};

export default HdbScatter;
