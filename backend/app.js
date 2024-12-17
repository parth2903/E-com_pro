const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const categoryRoutes = require("./routes/category");
const brandRoutes = require("./routes/brand");
const productRoutes = require("./routes/product");
const customerRoutes = require("./routes/customer")
const authRoutes = require("./routes/auth");
const { verifyToken, isAdmin } = require('./middleware/auth-middleware');

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send("Server rendering");
});

app.use("/category", verifyToken, isAdmin, categoryRoutes);
app.use("/brand", verifyToken, isAdmin, brandRoutes);
app.use("/product", verifyToken, isAdmin, productRoutes);
app.use("/customer", verifyToken, customerRoutes);
app.use("/auth", authRoutes);

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
