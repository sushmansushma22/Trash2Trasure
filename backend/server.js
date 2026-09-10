import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import connectDB from './config/db.js'
import wasteRoutes from './routes/wasteRoutes.js'
import aiRoutes from "./routes/aiRoutes.js";


dotenv.config()
console.log("ENV Loaded:", process.env.CLOUDINARY_CLOUD_NAME);
connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/waste', wasteRoutes)
app.use("/api/ai", aiRoutes);

app.get('/', (req, res) => {
  res.send('Trash2Treasure Backend is Running 🚀')
})

const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

