const express = require("express");
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");
const dotEnv = require("dotenv");
const todoRoutes = require("./routes/todo");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const superAdminRoutes = require("./routes/superAdmin");

// Allow CORS from all origins (development only)
app.use(cors());
// Or to allow only from your frontend origin (more secure)
// app.use(cors({
//     origin: 'http://localhost:5173',
//     credentials: true
// }));

dotEnv.config();

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("connected to mongodb");
}).catch((err) => console.log(err));

app.use(express.json());

// middleware start
app.use("/api/auth", authRoutes);
app.use("/api/todo", todoRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/superAdmin", superAdminRoutes);
// middleware ends

app.listen(process.env.PORT, () => {
    console.log("server running at 3000")
})