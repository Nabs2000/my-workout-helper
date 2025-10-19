import { useState } from "react";
import type { Route } from "./+types/user";
import type { User } from "../types/User";
import { doc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import WorkoutForm from "../components/workoutForm";
import WorkoutChart from "~/components/workoutProgGraph";
import WeightForm from "~/components/weightForm";
import WeightChart from "~/components/weightProgGraph";
import { useNavigate } from "react-router";
import {
  FiLogOut,
  FiActivity,
  FiTrendingUp,
  FiUser,
  FiPlus,
} from "react-icons/fi";

export async function loader({ params }: Route.LoaderArgs) {
  const userId = params.userId;
  const db = getFirestore();
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
}

export default function User({ loaderData }: { loaderData: User }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"workout" | "weight">("workout");

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      {/* Header */}
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome back, {loaderData.firstName}!
            </h1>
            <p className="text-gray-600">Track your fitness journey</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-white rounded-lg shadow-sm hover:bg-red-50 transition-colors duration-200"
          >
            <FiLogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto">
        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("workout")}
                className={`${
                  activeTab === "workout"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
              >
                <FiActivity className="w-5 h-5" />
                Workout Tracker
              </button>
              <button
                onClick={() => setActiveTab("weight")}
                className={`${
                  activeTab === "weight"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
              >
                <FiTrendingUp className="w-5 h-5" />
                Weight Progress
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Forms */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FiUser className="w-5 h-5" />
                Profile
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">
                    {loaderData.firstName} {loaderData.lastName || ""}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{loaderData.email}</p>
                </div>
              </div>
            </div>

            {activeTab === "workout" ? (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FiPlus className="w-5 h-5" />
                  Add Workout
                </h2>
                <WorkoutForm uid={loaderData.uid} />
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FiTrendingUp className="w-5 h-5" />
                  Log Weight
                </h2>
                <WeightForm uid={loaderData.uid} />
              </div>
            )}
          </div>

          {/* Right Column - Charts */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 h-full">
              {activeTab === "workout" ? (
                <>
                  <h2 className="text-lg font-semibold text-gray-800 mb-6">
                    Workout Progress
                  </h2>
                  <div className="h-[400px]">
                    <WorkoutChart user={loaderData} />
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-lg font-semibold text-gray-800 mb-6">
                    Weight Progress
                  </h2>
                  <div className="h-[400px]">
                    <WeightChart user={loaderData} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
