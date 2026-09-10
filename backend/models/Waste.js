import mongoose from 'mongoose'

const wasteSchema = new mongoose.Schema(
  {
    user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true,
},
    wasteType: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    address: {
      type: String,
      required: true,
    },
    pickupDate: {
      type: Date,
      required: true,
    },
    status: {
  type: String,
  enum: [
    "Pending",
    "Confirmed",
    "Collected",
    "Processing",
    "Completed",
    "Cancelled",
  ],
  default: "Pending",
},
reward: {
  type: Number,
  default: 0,
},
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Waste', wasteSchema)