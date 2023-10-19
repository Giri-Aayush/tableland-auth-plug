const express = require("express");
const env = require("dotenv").config();
const bodyparser = require("body-parser");
const cors = require("cors");

const app = express();
const user = require("./Routes/userRouter");

// Middleware configuration
app.use(bodyparser.json());
app.use(cors());
app.use("/user", user);

const PORT = process.env.PORT || 4000; // Corrected the fallback to default value for PORT

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
