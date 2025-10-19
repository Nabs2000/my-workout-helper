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

export default function WeightChart({ user }: { user: User }) {
  // Sort the filtered workouts
  const sortedWeights = user.weights.sort((a, b) => {
    return new Date(a.dateLogged).getTime() - new Date(b.dateLogged).getTime();
  });

  console.log("sortedWeights", sortedWeights);

  // Convert weights to chart data points
  const data: ChartDataPoint[] = sortedWeights.map(({ dateLogged, weight }) => {
    const day = Number(dateLogged.split("-")[2])
    const month = Number(dateLogged.split("-")[1])
    const year = Number(dateLogged.split("-")[0])
    return {
      date: new Date(year, month - 1, day),
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
            tickFormatter={(date) => new Date(date).toLocaleDateString("en-US")}
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
