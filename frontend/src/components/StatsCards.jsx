function StatsCards({ wasteData }) {

  const totalWaste = wasteData.length;

  const pending = wasteData.filter(
    (item) => item.status === "Pending"
  ).length;

  const completed = wasteData.filter(
    (item) => item.status === "Completed"
  ).length;

  const totalWeight = wasteData.reduce(
    (sum, item) => sum + Number(item.weight),
    0
  );

  // Example reward calculation
  const totalReward = totalWeight * 15;

  // Example carbon saving calculation
  const carbonSaved = (totalWeight * 2.5).toFixed(1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

      <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
        <p className="text-gray-500 text-sm">💰 Total Earned</p>
        <h2 className="text-3xl font-bold text-green-600 mt-2">
          ₹{totalReward}
        </h2>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
        <p className="text-gray-500 text-sm">♻️ Waste Submitted</p>
        <h2 className="text-3xl font-bold text-blue-600 mt-2">
          {totalWaste}
        </h2>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
        <p className="text-gray-500 text-sm">🚚 Pending Pickups</p>
        <h2 className="text-3xl font-bold text-orange-500 mt-2">
          {pending}
        </h2>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
        <p className="text-gray-500 text-sm">🌍 Carbon Saved</p>
        <h2 className="text-3xl font-bold text-green-700 mt-2">
          {carbonSaved} kg
        </h2>
      </div>

    </div>
  );
}

export default StatsCards;