const express = require("express");
const router = express.Router();

const {
  authUser,
  getuserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteuser,
  getUserByid,
  updateUser,
} = require("../controlers/userControler");
const { protect, admin } = require("../middleware/authMiddleware");

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/login", authUser);
router
  .route("/porfile")
  .get(protect, getuserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, admin, deleteuser)
  .get(protect, admin, getUserByid)
  .put(protect, admin, updateUser);

module.exports = router;
