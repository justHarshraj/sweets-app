const express = require("express");
const router = express.Router();

const {
  addSweet,
  getSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet,
} = require("../controllers/sweet.controller");

const protect = require("../middleware/auth.middleware");
const adminOnly = require("../middleware/admin.middleware");

router.post("/", protect, addSweet);
router.get("/", protect, getSweets);
router.get("/search", protect, searchSweets);
router.put("/:id", protect, updateSweet);

router.post("/:id/purchase", protect, purchaseSweet);
router.post("/:id/restock", protect, adminOnly, restockSweet);

router.delete("/:id", protect, adminOnly, deleteSweet);

module.exports = router;
