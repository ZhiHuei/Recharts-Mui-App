import { FC } from "react";
import { Label, Legend, Line, Tooltip, XAxis, YAxis } from "recharts";
import useReadCSV from "src/hook/useReadCSV";
import LineChart, {
  renderXAxis,
  renderYAxis,
} from "src/ui-components/LineChart";

export type PriceData = {
  year: string;
  estate: string;
  resalePrice: number;
  room4Rental: number;
  room3Rental: number;
};

const HdbVisualisation: FC<{}> = () => {
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

  console.log("resalePrice", matureResale);

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

  console.log("3 room rental", mature3RoomRental);
  console.log("3 room rental", mature4RoomRental);
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
      console.log("existing", existingData);

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

  console.log(mergedData);

  return (
    <LineChart chartTitle="Trend of Resale Property Price and Rental price in mature estates" dataPoints={mergedData}>
      <XAxis dataKey="year" height={50}><Label offset={-20} position="bottom" value="year"/></XAxis>
      <YAxis yAxisId="left" >
        <Label
          angle={-90}
          offset={-20}
          position="insideLeft"
          style={{ textAnchor: "middle" }}
          value="Average Resale Price (SGD)"
        />
      </YAxis>
      <YAxis yAxisId="right" orientation="right">
        <Label
          angle={90}
          offset={0}
          position="insideRight"
          style={{ textAnchor: "middle" }}
          value="Average Rental (SGD)"
        />
      </YAxis>
      <Line
        yAxisId="left"
        type="monotone"
        dataKey="resalePrice"
        strokeWidth={3}
        stroke="#8884d8"
        name="resale"
        unit=" SGD"
      />

      <Line
        yAxisId="right"
        type="monotone"
        dataKey="room4Rental"
        stroke="red"
        name="4 room"
        strokeDasharray="10"
        dot={<></>}
        unit=" SGD"
      />

      <Line
        yAxisId="right"
        type="monotone"
        dataKey="room3Rental"
        stroke="green"
        strokeDasharray="10"
        name="3 room"
        dot={<></>}
        unit=" SGD"
      />
      <Tooltip />
      <Legend align="right" verticalAlign="bottom" />
    </LineChart>
  );
};

export default HdbVisualisation;
