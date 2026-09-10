import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import axios from 'axios'

function SubmitWaste() {
  const [wasteType, setWasteType] = useState("");
const [image, setImage] = useState(null);
  

  const [weight, setWeight] = useState('')
  const [description, setDescription] = useState('')
  const [address, setAddress] = useState('')
  const [pickupDate, setPickupDate] = useState('')
  const handleSubmit = async () => {
  try {
   

const data = {
  wasteType,
  weight,
  description,
  address,
  pickupDate,
};
const response = await axios.post(
  "http://localhost:5000/api/waste",
  data,
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
);


    alert(response.data.message)

    setWasteType('')
    setWeight('')
    setDescription('')
    setAddress('')
    setPickupDate('')

  } catch (error) {
    console.error(error)
    alert('Submission Failed')
  }
}

  return (
    <div className="flex">
      <Sidebar /> 

      <div className="flex-1 min-h-screen bg-green-50 p-8">

        <h1 className="text-4xl font-bold text-center text-green-700 mb-2">
          Submit Your Waste
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Turn your recyclables into rewards! ♻️
        </p>

        {/* Waste Type Section */}
        <div className="bg-white rounded-xl shadow-md p-6 max-w-5xl mx-auto mb-6">
          <h2 className="font-semibold mb-4">
            What type of waste do you have?
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            <button
              onClick={() => setWasteType('E-Waste')}
              className="border rounded-lg p-4 hover:bg-green-100"
            >
              💻 E-Waste
            </button>

            <button
              onClick={() => setWasteType('Plastic')}
              className="border rounded-lg p-4 hover:bg-green-100"
            >
              🧴 Plastic
            </button>

            <button
              onClick={() => setWasteType('Paper')}
              className="border rounded-lg p-4 hover:bg-green-100"
            >
              📄 Paper
            </button>

            <button
              onClick={() => setWasteType('Glass')}
              className="border rounded-lg p-4 hover:bg-green-100"
            >
              🍾 Glass
            </button>

            <button
              onClick={() => setWasteType('Metal')}
              className="border rounded-lg p-4 hover:bg-green-100"
            >
              🔩 Metal
            </button>

            <button
              onClick={() => setWasteType('Batteries')}
              className="border rounded-lg p-4 hover:bg-green-100"
            >
              🔋 Batteries
            </button>

            <button
              onClick={() => setWasteType('Textiles')}
              className="border rounded-lg p-4 hover:bg-green-100"
            >
              👕 Textiles
            </button>

            <button
              onClick={() => setWasteType('Organic')}
              className="border rounded-lg p-4 hover:bg-green-100"
            >
              🌿 Organic
            </button>

          </div>

          <p className="mt-4 text-green-600 font-semibold">
            Selected: {wasteType}
          </p>
        </div>
        

        {/* Two Cards Layout */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">

          {/* Weight & Photo */}
          <div className="bg-white rounded-xl shadow-md p-6">

            <h2 className="font-semibold mb-4">
              Weight & Photo
            </h2>

            <input
              type="number"
              placeholder="Enter weight in kg"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full border rounded-lg p-3 mb-4"
            />

            <input
type="file"
accept="image/*"
onChange={(e)=>setImage(e.target.files[0])}
className="w-full border rounded-lg p-3 mb-4"
/>

            <textarea
              placeholder="Additional details about your waste..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-lg p-3"
            ></textarea>

          </div>

          {/* Pickup Details */}
          <div className="bg-white rounded-xl shadow-md p-6">

            <h2 className="font-semibold mb-4">
              Pickup Details
            </h2>

            <textarea
              placeholder="Enter your pickup address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border rounded-lg p-3 mb-4"
            ></textarea>

            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full border rounded-lg p-3 mb-4"
            />

            <select className="w-full border rounded-lg p-3">
              <option>Select Time Slot</option>
              <option>9 AM - 12 PM</option>
              <option>12 PM - 3 PM</option>
              <option>3 PM - 6 PM</option>
            </select>

          </div>

        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-8">
          <button
  onClick={handleSubmit}
  className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700"
>
  Submit Waste Request
</button>
        </div>

      </div>
    </div>
  )
}

export default SubmitWaste