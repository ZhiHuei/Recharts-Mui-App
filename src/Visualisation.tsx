import { FC } from "react";
import { Line, Tooltip } from "recharts";
import LineChart, { renderXAxis, renderYAxis } from "src/components/LineChart";
import useReadCSV from "src/hook/useReadCSV";

export type AirQuality = {
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

const Visualisation: FC<{}> = () => {
  const data = useReadCSV<AirQuality>("/data/delhi_aqi.csv", {
    transform: (value, header) => {
      if (header !== "date") {
        return Number(value);
      }
      return new Date(Date.parse(value));
    },
  });

  if (!data) return <></>;

  console.log("data", data);

  return (
    <LineChart chartTitle="Air Quality Data of Delhi, India" dataPoints={data}>
      {renderXAxis({
        dataKey: "date",
        noOfDataPoints: data.length,
        label: "Date",
        interval: 1000,
      })}
      {renderYAxis({ dataKey: "o3", label: "Concentration μg/m3" })}
      <Line type="monotone" dataKey="o3" stroke="#8884d8" dot={<></>} />

      {renderYAxis({ dataKey: "no" })}
      <Line type="monotone" dataKey="no" stroke="red" dot={<></>} />
      <Tooltip />
    </LineChart>
  );
};

export default Visualisation;
