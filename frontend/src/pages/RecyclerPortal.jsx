import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function RecyclerPortal() {

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
  "http://localhost:5000/api/waste",
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
);

      setRequests(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
  `http://localhost:5000/api/waste/${id}`,
  { status },
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
);

      fetchRequests();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 bg-green-50 min-h-screen p-8">

        <h1 className="text-4xl font-bold mb-8">
          Recycler Dashboard
        </h1>

        <div className="grid md:grid-cols-2 gap-6">

          {requests.map((item) => (

            <div
              key={item._id}
              className="bg-white rounded-xl shadow-lg p-6"
            >

              <h2 className="text-xl font-bold">
                {item.wasteType}
              </h2>

              <p>{item.weight} Kg</p>

              <p>{item.address}</p>

              <p className="mt-2">
                Status :
                <span className="font-bold text-green-600">
                  {" "}
                  {item.status}
                </span>
              </p>

         <div className="flex gap-3 mt-5 flex-wrap">

  {item.status === "Pending" && (
    <>
      <button
        onClick={() => updateStatus(item._id, "Confirmed")}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Confirm
      </button>

      <button
        onClick={() => updateStatus(item._id, "Cancelled")}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Reject
      </button>
    </>
  )}

  {item.status === "Confirmed" && (
    <button
      onClick={() => updateStatus(item._id, "Collected")}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      Collected
    </button>
  )}

  {item.status === "Collected" && (
    <button
      onClick={() => updateStatus(item._id, "Processing")}
      className="bg-orange-500 text-white px-4 py-2 rounded"
    >
      Processing
    </button>
  )}

  {item.status === "Processing" && (
    <button
      onClick={() => updateStatus(item._id, "Completed")}
      className="bg-purple-600 text-white px-4 py-2 rounded"
    >
      Complete
    </button>
  )}

  {item.status === "Completed" && (
    <span className="bg-green-100 text-green-700 px-4 py-2 rounded font-bold">
      ✅ Completed
    </span>
  )}

  {item.status === "Cancelled" && (
    <span className="bg-red-100 text-red-700 px-4 py-2 rounded font-bold">
      ❌ Cancelled
    </span>
  )}

</div>
            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default RecyclerPortal;