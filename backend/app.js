const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const categoryRoutes = require("./routes/category");
const brandRoutes = require("./routes/brand");

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send("Server rendering");
});

app.use("/category", categoryRoutes);
app.use("/brand", brandRoutes);

async function connectDb() {
  mongoose.connect("mongodb://localhost:27017", {
    dbName: "e-com_pro"
  });
  console.log("connected");
}

connectDb().catch((err) => {
  console.log(err);
  
});

app.listen(port, () => console.log(`listening on port:${port}`));
