const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");

const users = require("./data/users");
const products = require("./data/products");
const User = require("./models/userModel");
const Product = require("./models/productModel");
const Order = require("./models/orderModel");
const connectdb = require("./config/db");

dotenv.config();
connectdb();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// یعنی اگر در کنسول  جمله
// node backend/seeder -d
// قرار گرفت
//داخل ارایه 2 یعنی هر چیزی که مثل
// -d
// پاس داده شود
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
