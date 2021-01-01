const express = require("express");
const router = express.Router();

const {
  getProducs,
  getProducsbyId,
  deleteProduct,
  createproduct,
  updateProduct,
  createProductreview,
  gettopProducts,
} = require("../controlers/productControlers");
const { protect, admin } = require("../middleware/authMiddleware");

router.route("/").get(getProducs).post(protect, admin, createproduct);
router.route("/:id/reviews").post(protect, createProductreview);

router.get("/top", gettopProducts);
router
  .route("/:id")
  .get(getProducsbyId)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

module.exports = router;
