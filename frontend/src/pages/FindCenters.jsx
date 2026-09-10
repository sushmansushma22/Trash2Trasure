import { useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

function FindCenters() {
  const centers = [
    {
      id: 1,
      name: "Green Earth Recycling",
      type: "Plastic",
      rating: 4.8,
      distance: "2.3 km",
      position: [17.385, 78.4867],
    },
    {
      id: 2,
      name: "Eco Scrap Center",
      type: "E-Waste",
      rating: 4.7,
      distance: "3.5 km",
      position: [16.5062, 80.648],
    },
    {
      id: 3,
      name: "Paper Recycling Hub",
      type: "Paper",
      rating: 4.6,
      distance: "5.2 km",
      position: [17.6868, 83.2185],
    },
    {
      id: 4,
      name: "Glass Collection Point",
      type: "Glass",
      rating: 4.5,
      distance: "4.1 km",
      position: [17.4239, 78.4738],
    },
  ];

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredCenters = centers.filter((center) => {
    const searchMatch = center.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const filterMatch =
      filter === "All" || center.type === filter;

    return searchMatch && filterMatch;
  });

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-green-50 min-h-screen p-8">

        <h1 className="text-4xl font-bold text-green-700 mb-6">
          📍 Find Recycling Centers
        </h1>

        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Search Recycling Center..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-xl border mb-5 shadow-sm"
        />

        {/* Filter Buttons */}

        <div className="flex flex-wrap gap-3 mb-8">

          {["All", "Plastic", "E-Waste", "Paper", "Glass"].map(
            (item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`px-5 py-2 rounded-full transition ${
                  filter === item
                    ? "bg-green-600 text-white"
                    : "bg-white shadow hover:bg-green-100"
                }`}
              >
                {item}
              </button>
            )
          )}

        </div>

        {/* Nearby Centers */}

        <h2 className="text-2xl font-bold mb-4">
          Nearby Centers
        </h2>

        <div className="grid md:grid-cols-2 gap-5 mb-8">

          {filteredCenters.map((center) => (

            <div
              key={center.id}
              className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition"
            >

              <h2 className="text-xl font-bold">
                {center.name}
              </h2>

              <p className="mt-2">
                ♻ <b>{center.type}</b>
              </p>

              <p>
                ⭐ {center.rating}
              </p>

              <p>
                📍 {center.distance}
              </p>

            </div>

          ))}

        </div>

        {/* Big Map */}

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">

          <MapContainer
            center={[17.385, 78.4867]}
            zoom={7}
            style={{
              width: "100%",
              height: "650px",
            }}
          >

            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {filteredCenters.map((center) => (

              <Marker
                key={center.id}
                position={center.position}
              >
                <Popup>

                  <h2 className="font-bold">
                    {center.name}
                  </h2>

                  ⭐ {center.rating}

                  <br />

                  ♻ {center.type}

                  <br />

                  📍 {center.distance}

                </Popup>

              </Marker>

            ))}

          </MapContainer>

        </div>

      </div>
    </div>
  );
}

export default FindCenters;