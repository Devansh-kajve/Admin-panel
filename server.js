const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const auth = require("./routes/Auth");
const instance = require("./routes/instanceRoutes");
const databaseRoutes = require("./routes/databaseRoutes");
const userRoutes = require("./routes/userRoutes");
const authRestrictionsRoutes = require("./routes/restrictionsRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use("/api/instances", instance);
app.use("/api/auth", auth);
app.use("/api/databases", databaseRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth-restrictions", authRestrictionsRoutes);
