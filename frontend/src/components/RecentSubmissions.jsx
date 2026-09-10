function RecentSubmissions({ wasteData }) {
  const recent = [...wasteData].reverse().slice(0, 5);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-8">

      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold text-green-700">
          Recent Submissions
        </h2>

        <span className="text-green-600 font-semibold cursor-pointer hover:underline">
          View All
        </span>
      </div>

      {recent.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No waste submitted yet.
        </p>
      ) : (
        <div className="space-y-4">

          {recent.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center border rounded-xl p-4 hover:bg-green-50 transition"
            >
              <div>
                <h3 className="font-bold text-lg">
                  ♻️ {item.wasteType}
                </h3>

                <p className="text-gray-500">
                  {item.weight} kg
                </p>
              </div>

              <div className="text-right">

                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold
                  ${
                    item.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : item.status === "Confirmed"
                      ? "bg-blue-100 text-blue-700"
                      : item.status === "Collected"
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
          ))}

        </div>
      )}

    </div>
  );
}

export default RecentSubmissions;