import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import ActionCards from "../components/ActionCards";
import StatsCards from "../components/StatsCards";
import RecentSubmissions from "../components/RecentSubmissions";
import WasteChart from "../components/WasteChart";

function Dashboard() {

  const [wasteData, setWasteData] = useState([]);

  useEffect(() => {
    fetchWaste();
  }, []);

  const fetchWaste = async () => {
    try {
    const res = await axios.get(
  "http://localhost:5000/api/waste",
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
);
      setWasteData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-green-50 min-h-screen p-8">

        {/* Hero Section */}
        {/* ================= HERO SECTION ================= */}

<div className="bg-gradient-to-r from-green-700 via-green-600 to-green-500 rounded-3xl shadow-xl p-10 md:p-14 text-center text-white mb-8">

  {/* Brand Name */}
  <h1 className="text-10xl md:text-11xl font-extrabold tracking-wide">
    Welcome to{" "}
    <span className="text-yellow-300">
      Trash2Treasure
    </span>
  </h1>

  {/* Greeting */}
  <h2 className="mt-6 text-2xl md:text-3xl font-semibold">
    👋 Hello,
    <span className="text-yellow-200 ml-2">
      {localStorage.getItem("userName") || "Eco Warrior"}
    </span>
  </h2>

  {/* Quote */}
  <p className="mt-5 text-lg md:text-xl italic text-green-100 max-w-3xl mx-auto">
    "Turn your waste into wealth while saving the planet! 🌍♻️"
  </p>

  {/* Badge */}
  <div className="mt-8 inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-white/20">
    🌱 <span className="font-medium">Together for a Cleaner Tomorrow</span>
  </div>

</div>

        {/* Action Cards */}
        <ActionCards />

        {/* Dynamic Stats */}
        <StatsCards wasteData={wasteData} />

        

        <div className="grid lg:grid-cols-2 gap-6 mt-8">

    <RecentSubmissions
        wasteData={wasteData}
    />

    <WasteChart
        wasteData={wasteData}
    />

</div>

      </div>
    </div>
  );
}

export default Dashboard;