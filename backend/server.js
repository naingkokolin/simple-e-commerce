const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const productRouter = require('./routes/productRoutes');
const authRouter = require('./routes/authRoutes');
const Product = require('./models/Product');
const Order = require('./models/Order');


dotenv.config();

const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded());

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  }
  ).catch(e =>
    console.error("Error connecting to db : ", e)
);

app.use('/api/products', productRouter);
app.use('/api/user', authRouter);
