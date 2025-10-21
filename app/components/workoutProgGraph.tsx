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

export default function WorkoutChart({ user }: { user: User }) {
  const [workoutType, setWorkoutType] = useState<WorkoutType>("");

  // Filter workouts by selected type if one is selected
  const filteredWorkouts = workoutType
    ? user.workouts.filter((workout) => workout.workoutName === workoutType)
    : user.workouts;

  // Sort the filtered workouts
  const sortedWorkouts = filteredWorkouts.sort((a, b) => {
    return new Date(a.dateLogged).getTime() - new Date(b.dateLogged).getTime();
  });

  // Convert filtered workouts to chart data points
  const data: ChartDataPoint[] = sortedWorkouts.map(
    ({ dateLogged, weight, workoutName }) => {
      const day = Number(dateLogged.split("-")[2]);
      const month = Number(dateLogged.split("-")[1]);
      const year = Number(dateLogged.split("-")[0]);
      return {
        date: new Date(year, month - 1, day),
        weight: weight,
        name: workoutName,
      };
    }
  );

  return (
    <div>
      {workoutType !== "" ? (
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
              name={workoutType || "All Workouts"}
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
          <select
            className="w-full text-black p-2 border rounded"
            value={workoutType}
            onChange={(e) => setWorkoutType(e.target.value as WorkoutType)}
          >
            <option value="">Select a workout</option>
            <option value="Bench Press">Bench Press</option>
            <option value="Squat">Squat</option>
            <option value="Deadlift">Deadlift</option>
            <option value="RDL">RDL</option>
            <option value="Overhead Press">Overhead Press</option>
            <option value="Pull Up">Pull Up</option>
            <option value="Push Up">Push Up</option>
            <option value="Muscle Up">Muscle Up</option>
          </select>
        </div>
      ) : (
        <select
          className="w-full text-black p-2 border rounded"
          value={workoutType}
          onChange={(e) => setWorkoutType(e.target.value as WorkoutType)}
        >
          <option value="">Select a workout</option>
          <option value="Bench Press">Bench Press</option>
          <option value="Squat">Squat</option>
          <option value="Deadlift">Deadlift</option>
          <option value="RDL">RDL</option>
          <option value="Overhead Press">Overhead Press</option>
          <option value="Pull Up">Pull Up</option>
          <option value="Push Up">Push Up</option>
          <option value="Muscle Up">Muscle Up</option>
        </select>
      )}
    </div>
  );
}
