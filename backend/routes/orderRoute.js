const express = require("express");
const router = express.Router();

const {
  addOrderItems,
  getorderbyId,
  updateOrderTopaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
} = require("../controlers/orderController");
const { protect, admin } = require("../middleware/authMiddleware");

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getorderbyId);
router.route("/:id/pay").put(protect, updateOrderTopaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

module.exports = router;
