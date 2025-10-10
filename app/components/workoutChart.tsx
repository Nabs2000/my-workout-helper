import { useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend } from "recharts";
import type { User } from "~/types/User";
import type { Workout } from "~/types/Workout";
import type { ChartDataPoint } from "~/types/chartDataPoint";
import type { WorkoutType } from "~/types/workoutType";
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

export default function WorkoutChart({ user }: { user: User }) {
  const [showChart, setShowChart] = useState(false);
  const [workoutType, setWorkoutType] = useState<WorkoutType>("");

  // Filter workouts by selected type if one is selected
  const filteredWorkouts = workoutType 
    ? user.workouts.filter(workout => workout.workoutName === workoutType)
    : user.workouts;

  // Convert filtered workouts to chart data points
  const data: ChartDataPoint[] = filteredWorkouts.map(({ dateLogged, weight, workoutName }) => ({
    xAxis: dateLogged,
    yAxis: weight,
    name: workoutName // Adding workout name to data point for reference
  }));

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
        onClick={() => {
          showChart ? setShowChart(false) : setShowChart(true);
        }}
      >
        {showChart ? "Hide Chart..." : "Show Chart"}
      </button>
      {showChart ? (
        <div>
          <LineChart width={600} height={300} data={data}>
            <CartesianGrid />
            <Line 
              type="monotone" 
              dataKey="yAxis" 
              name={workoutType || 'All Workouts'} 
              stroke="#8884d8" 
              strokeWidth={2} 
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <XAxis 
              dataKey="xAxis" 
              label={{ value: 'Date', position: 'insideBottomRight', offset: -5 }}
            />
            <YAxis 
              label={{ value: 'Weight', angle: -90, position: 'insideLeft' }}
            />
            <Legend />
          </LineChart>
          <select
            className="w-full p-2 border rounded"
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
        ""
      )}
    </div>
  );
}
