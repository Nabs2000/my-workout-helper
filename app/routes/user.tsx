import { useState, useEffect } from "react";
import type { Route } from "./+types/user";
import type { User } from "../types/User";
import { db } from "config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import WorkoutForm from "../components/workoutForm";
import WorkoutChart from "~/components/workoutProgGraph";
import WeightForm from "~/components/weightForm";
import WeightChart from "~/components/weightProgGraph";
import Bug from "~/components/bug";
import { useNavigate } from "react-router";
import {
  FiLogOut,
  FiActivity,
  FiTrendingUp,
  FiUser,
  FiPlus,
  FiLoader,
} from "react-icons/fi";
import { FaBug } from "react-icons/fa";

export async function loader({ params }: Route.LoaderArgs) {
  // Just return the userId - we'll fetch user data client-side where auth context exists
  return { userId: params.userId };
}

export default function User({ loaderData }: { loaderData: { userId: string } }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"workout" | "weight" | "bug">(
    "workout"
  );
  const [weightRefreshKey, setWeightRefreshKey] = useState(0);
  const [workoutRefreshKey, setWorkoutRefreshKey] = useState(0);

  // Fetch user data client-side where Firebase Auth context exists
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        console.log("Fetching user data for:", loaderData.userId);
        const docRef = doc(db, "users", loaderData.userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("User data:", docSnap.data());
          setUserData(docSnap.data() as User);
        } else {
          console.log("No such document!");
          setError("User not found");
        }
      } catch (err: any) {
        console.error("Error fetching user data:", err);
        setError(err.message || "Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [loaderData.userId]);

  const handleLogout = () => {
    navigate("/");
  };

  const handleWorkoutSubmit = () => {
    setWorkoutRefreshKey((prevKey) => prevKey + 1);
  };

  const handleWeightSubmit = () => {
    setWeightRefreshKey((prevKey) => prevKey + 1);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <FiLoader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your data...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-4">{error || "Failed to load user data"}</p>
          <button
            onClick={() => navigate("/")}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      {/* Header */}
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome back, {userData.firstName}!
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
                Weight Tracker
              </button>
              <button
                onClick={() => setActiveTab("bug")}
                className={`${
                  activeTab === "bug"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
              >
                <FaBug className="w-5 h-5" />
                Bug Reporter
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab !== "bug" ? (
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
                    <p className="font-medium text-black">
                      {userData.firstName} {userData.lastName || ""}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-black">{userData.email}</p>
                  </div>
                </div>
              </div>

              {activeTab === "workout" && (
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FiPlus className="w-5 h-5" />
                    Workout Form
                  </h2>
                  <WorkoutForm
                    uid={userData.uid}
                    onSubmit={handleWorkoutSubmit}
                  />
                </div>
              )}
              {activeTab === "weight" && (
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FiTrendingUp className="w-5 h-5" />
                    Log Weight
                  </h2>
                  <WeightForm
                    uid={userData.uid}
                    onSubmit={handleWeightSubmit}
                  />
                </div>
              )}
            </div>

            {/* Right Column - Charts */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-6 h-full">
                {activeTab === "workout" && (
                  <>
                    <h2 className="text-lg font-semibold text-gray-800 mb-6">
                      Visualize Your Workout Progress
                    </h2>
                    <div className="h-[400px]">
                      <WorkoutChart user={userData} />
                    </div>
                  </>
                )}
                {activeTab === "weight" && (
                  <>
                    <h2 className="text-lg font-semibold text-gray-800 mb-6">
                      Visualize Your Weight Progress
                    </h2>
                    <div className="h-[400px]">
                      <WeightChart user={userData} />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaBug className="w-5 h-5" />
              Bug Reporter
            </h2>
            <Bug />
          </div>
        )}
      </main>
    </div>
  );
}
