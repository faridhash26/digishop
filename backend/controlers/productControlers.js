const asyncHandler = require("express-async-handler");

const Product = require("../models/productModel");

// @desc fetch all products
// @route Get /api/products
// @access public
const getProducs = asyncHandler(async (req, res) => {
  const pageSize = 10;

  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const count = await Product.countDocuments({ ...keyword });

  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProducsbyId = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product  not found");
  }
});

// @desc    delete product
// @route   delete /api/products/:id
// @access  private/admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "product removed" });
  } else {
    res.status(404);
    throw new Error("Product  not found");
  }
});

// @desc    create a product
// @route   post /api/products/
// @access  private/admin
const createproduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "samplename",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "samplebrand",
    category: "sample category",
    countInStock: 0,
    numReviews: 0,
    description: "sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    update a product
// @route   put /api/products/:id
// @access  private/admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    category,
    brend,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.category = category;
    product.brend = brend;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

// @desc    create new  review
// @route   put /api/products/:id/reviews
// @access  private
const createProductreview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyreview = product.reviews.find(
      (r) => r.user.toString() == req.user._id.toString()
    );
    if (alreadyreview) {
      res.status(400);
      throw new Error("product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({ message: "review added" });
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

// @desc    get top rated products
// @route   get /api/products/top
// @access  upublic
const gettopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});

module.exports = {
  getProducs,
  getProducsbyId,
  deleteProduct,
  createproduct,
  updateProduct,
  createProductreview,
  gettopProducts,
};
