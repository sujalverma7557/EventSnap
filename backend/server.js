import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import downloadRoutes from "./routes/downloadRoutes.js";
import eventRoutes from './routes/eventRoutes.js';
import photoRoutes from './routes/photoRoutes.js';


dotenv.config()
connectDB()

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use('/api/events', eventRoutes);
app.use('/api/photos', photoRoutes);


app.use('/api/users',userRoutes)
app.use('/api/upload',uploadRoutes)

app.use('/api/download', downloadRoutes)

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log('Server is running on port ' + `${PORT}`);
});
