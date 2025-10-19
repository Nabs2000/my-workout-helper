import { useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from "recharts";
import type { User } from "~/types/User";
import type { ChartDataPoint } from "~/types/chartDataPoint";
import type { WorkoutType } from "~/types/workoutType";
import { Timestamp } from "firebase/firestore";
// How to use
/*
import { LineChart, Line } from 'recharts';
const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, ...];

const MyChart = () => (
  <LineChart width={600} height={300} data={data}>
    <Line dataKey="uv" />
  </LineChart>
);
*/

export default function WeightChart({ user }: { user: User }) {
  const toDateTime = (secs: number) => {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
  };

  // Sort the filtered workouts
  const sortedWeights = user.weights.sort((a, b) => {
    if (a.dateLogged instanceof Object && b.dateLogged instanceof Object) {
      // Cast dateLogged to Timestamp
      const aTimestamp = a.dateLogged as Timestamp;
      const bTimestamp = b.dateLogged as Timestamp;
      return aTimestamp.seconds - bTimestamp.seconds;
    }
    return 0;
  });

  console.log("sortedWeights", sortedWeights);

  // Convert weights to chart data points
  const data: ChartDataPoint[] = sortedWeights.map(({ dateLogged, weight }) => {
    return {
      date:
        dateLogged instanceof Date
          ? dateLogged
          : toDateTime(dateLogged.seconds),
      weight: weight,
      name: "Weight",
    };
  });

  console.log("data", data);

  return (
    <div>
      <div>
        <LineChart
          width={600}
          height={400}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 80 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => new Date(date).toLocaleDateString()}
            tick={{ fill: "black" }}
            tickMargin={30}
            angle={-45}
            minTickGap={20}
            interval={0}
            padding={{ left: 20, right: 40 }}
          />
          <YAxis
            tick={{ fill: "black" }}
            label={{
              value: "Weight (lbs)",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          <Line
            type="monotone"
            dataKey="weight"
            name="Weight"
            stroke="#8884d8"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </div>
    </div>
  );
}
