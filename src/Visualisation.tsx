import { FC } from "react";
import LineChart from "src/components/LineChart";
import useReadCSV from "src/hook/useReadCSV";

const headers = [
  "date",
  "co",
  "no",
  "no2",
  "o3",
  "so2",
  "pm2_5",
  "pm10",
  "nh3",
];

type AirQuality = {
  date: Date;
  co: number;
  no: number;
  no2: number;
  o3: number;
  so2: number;
  pm2_5: number;
  pm10: number;
  nh3: number;
};

const Visualisation: FC<{}> = ({}) => {
  console.log('values');
  // const {values} = useReadCSV("data/delhi_aqi.csv");
  
  return (
    <LineChart
      chartTitle="Air Quality Data of Delhi, India"
      dataKey={""}
      dataPoints={[]}
    >
      {/* {renderXAxis({ dataKey: 'CO'})} */}
    </LineChart>
  );
};

export default Visualisation;
