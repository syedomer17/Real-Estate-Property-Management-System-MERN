import express from "express";
import config from "config";
import cors from "cors";

const app = express();
const PORT = config.get("PORT") || 8090;

app.use(
    cors({
        origin : ["http://localhost:5173"]
    })
); // Apne frontend ka port dalna

app.use(express.json()); // most important line for the project 

// ✅ Home Route
app.get("/", (req, res) => {
  try {
    res.status(200).json({ message: "Server is up and Running" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

// ✅ Not Found Route
app.use((req, res) => {
  res.status(404).json({ message: "Not Found Router" });
});

// ✅ Server Listen
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});