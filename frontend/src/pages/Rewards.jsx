import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function Rewards() {
  const [wasteData, setWasteData] = useState([]);
  const [wallet, setWallet] = useState(0);
  const [completed, setCompleted] = useState(0);
const [carbonSaved, setCarbonSaved] = useState(0);

  useEffect(() => {
    fetchRewards();
  }, []);

  const fetchRewards = async () => {
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

      let total = 0;
let completedCount = 0;
let carbon = 0;

res.data.data.forEach((item) => {
  if (item.status === "Completed") {
    total += item.weight * 20;
    completedCount++;
    carbon += item.weight * 3.5;
  }
});

setWallet(total);
setCompleted(completedCount);
setCarbonSaved(carbon);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-green-50 min-h-screen p-8">

        <h1 className="text-4xl font-bold text-green-700 mb-8">
          Rewards Wallet 💰
        </h1>

        <div className="bg-gradient-to-r from-green-600 to-green-400 rounded-xl p-8 text-white shadow-lg">

          <h2 className="text-xl">
            Available Balance
          </h2>

          <p className="text-5xl font-bold mt-3">
            ₹ {wallet}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

  <div className="bg-white rounded-xl shadow-md p-6">
    <h3 className="text-gray-500">
      Completed Pickups
    </h3>

    <p className="text-3xl font-bold text-green-600 mt-2">
      {completed}
    </p>
  </div>

  <div className="bg-white rounded-xl shadow-md p-6">
    <h3 className="text-gray-500">
      Carbon Saved
    </h3>

    <p className="text-3xl font-bold text-green-600 mt-2">
      {carbonSaved.toFixed(1)} kg
    </p>
  </div>

  <div className="bg-white rounded-xl shadow-md p-6">
    <h3 className="text-gray-500">
      Total Rewards
    </h3>

    <p className="text-3xl font-bold text-green-600 mt-2">
      ₹ {wallet}
    </p>
  </div>

</div>

        </div>

        <div className="bg-white rounded-xl shadow-md mt-8 p-6">

          <h2 className="text-2xl font-bold mb-5">
            Transaction History
          </h2>

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left p-3">
                  Waste
                </th>

                <th className="text-left p-3">
                  Weight
                </th>

                <th className="text-left p-3">
                  Reward
                </th>

              </tr>

            </thead>

            <tbody>

              {wasteData
                .filter((item) => item.status === "Completed")
                .map((item) => (

                  <tr
                    key={item._id}
                    className="border-b"
                  >

                    <td className="p-3">
                      {item.wasteType}
                    </td>

                    <td className="p-3">
                      {item.weight} Kg
                    </td>

                    <td className="p-3 text-green-600 font-bold">
                      ₹ {item.weight * 20}
                    </td>

                  </tr>

                ))}

            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
}

export default Rewards;