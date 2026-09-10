import Waste from '../models/Waste.js'

// Submit Waste
export const submitWaste = async (req, res) => {
  try {
    const {
      wasteType,
      weight,
      description,
      address,
      pickupDate,
    } = req.body;

const image = "";

    const waste = await Waste.create({
      user: req.user.id,
      wasteType,
      weight,
      description,
      address,
      pickupDate,
      image,
      status: "Pending",
      reward: 0,
    });

    res.status(201).json({
      success: true,
      message: "Waste Submitted Successfully",
      data: waste,
    });

  } catch (error) {
  console.log("ERROR:", error);

  res.status(500).json({
    success: false,
    message: error.message,
  });
}
};

// Get All Waste
export const getAllWaste = async (req, res) => {
  try {
   const wastes = await Waste.find({
  user: req.user.id,
}).sort({
  createdAt: -1,
});

res.json({
  success: true,
  data: wastes,
});

    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
    })
  }
}
// Dashboard Stats
export const getStats = async (req, res) => {
  try {
    const wastes = await Waste.find()

    const totalWaste = wastes.length

    const pendingPickups = wastes.filter(
      (w) => w.status === 'Pending'
    ).length

    const totalWeight = wastes.reduce(
      (sum, w) => sum + Number(w.weight),
      0
    )

    const rewardPoints = totalWeight * 10

    const carbonSaved = totalWeight * 2

    res.json({
      totalWaste,
      pendingPickups,
      rewardPoints,
      carbonSaved,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
    })
  }
}
// recyclerPortal Stats
export const updateWasteStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const waste = await Waste.findById(req.params.id);

    if (!waste) {
      return res.status(404).json({
        success: false,
        message: "Waste not found",
      });
    }

    waste.status = status;

    // Reward only when completed
    if (status === "Completed") {
      waste.reward = waste.weight * 20; // ₹20 per Kg
    }

    await waste.save();

    res.json({
      success: true,
      data: waste,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};