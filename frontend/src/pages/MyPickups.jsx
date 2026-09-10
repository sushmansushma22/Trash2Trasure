import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function MyPickups() {
  const [pickups, setPickups] = useState([]);

  useEffect(() => {
    fetchPickups();
  }, []);

  const fetchPickups = async () => {
    try {
      const res = await axios.get(
  "http://localhost:5000/api/waste",
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
);
      setPickups(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const steps = [
    "Pending",
    "Confirmed",
    "Collected",
    "Processing",
    "Completed",
  ];

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-green-50 min-h-screen p-8">

        <h1 className="text-4xl font-bold text-green-700 mb-8">
          My Pickups 🚚
        </h1>

        <div className="space-y-6">

          {pickups.map((item) => (

            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md p-6"
            >

              <div className="flex justify-between">

                <div>

                  <h2 className="text-2xl font-bold">
                    ♻️ {item.wasteType}
                  </h2>

                  <p className="text-gray-600">
                    Weight : {item.weight} Kg
                  </p>

                  <p className="text-gray-600">
                    Pickup :
                    {" "}
                    {new Date(
                      item.pickupDate
                    ).toLocaleDateString()}
                  </p>

                </div>

                <div>

                  <span
  className={`px-4 py-2 rounded-full font-semibold
  ${
    item.status === "Pending"
      ? "bg-yellow-100 text-yellow-700"
      : item.status === "Confirmed"
      ? "bg-blue-100 text-blue-700"
      : item.status === "Collected"
      ? "bg-cyan-100 text-cyan-700"
      : item.status === "Processing"
      ? "bg-purple-100 text-purple-700"
      : item.status === "Completed"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700"
  }`}
>
  {item.status}
</span>

                </div>

              </div>

              <div className="mt-6 flex justify-between">

                {steps.map((step) => (

                  <div
                    key={step}
                    className="flex flex-col items-center"
                  >

                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white
                      ${
                        steps.indexOf(step) <=
                        steps.indexOf(item.status)
                          ? "bg-green-600"
                          : "bg-gray-300"
                      }`}
                    >
                      {steps.indexOf(step) < steps.indexOf(item.status)
  ? "✓"
  : steps.indexOf(step) === steps.indexOf(item.status)
  ? "●"
  : "○"}
                    </div>

                    <p className="text-sm mt-2">
                      {step}
                    </p>

                  </div>

                ))}

              </div>

            </div>

          ))}

        </div>

      </div>
    </div>
  );
}

export default MyPickups;