import express from "express";
import bodyParser from "body-parser";
import cors from "cors"; // Import cors
import userRoutes from "../routes/userRoutes";

const app = express();

// Enable CORS for all origins
app.use(cors());

// Parse incoming requests as JSON
app.use(bodyParser.json());

// Define your routes
app.use("/users", userRoutes);

// Set the port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
