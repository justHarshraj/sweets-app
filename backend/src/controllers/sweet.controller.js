const Sweet = require("../models/Sweet");

// @desc Add a new sweet
// @route POST /api/sweets
// @access Protected
const addSweet = async (req, res) => {
  const { name, category, price, quantity } = req.body;

  if (!name || !category || price == null || quantity == null) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sweet = await Sweet.create({
    name,
    category,
    price,
    quantity,
  });

  res.status(201).json(sweet);
};

// @desc Get all sweets
// @route GET /api/sweets
// @access Protected
const getSweets = async (req, res) => {
  const sweets = await Sweet.find();
  res.json(sweets);
};

// @desc Search sweets
// @route GET /api/sweets/search
// @access Protected
const searchSweets = async (req, res) => {
  const { name, category, minPrice, maxPrice } = req.query;

  let query = {};

  if (name) query.name = { $regex: name, $options: "i" };
  if (category) query.category = { $regex: category, $options: "i" };

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  const sweets = await Sweet.find(query);
  res.json(sweets);
};

// @desc Update sweet
// @route PUT /api/sweets/:id
// @access Protected
const updateSweet = async (req, res) => {
  const sweet = await Sweet.findById(req.params.id);

  if (!sweet) {
    return res.status(404).json({ message: "Sweet not found" });
  }

  Object.assign(sweet, req.body);
  const updatedSweet = await sweet.save();

  res.json(updatedSweet);
};

// @desc Delete sweet
// @route DELETE /api/sweets/:id
// @access Admin only
const deleteSweet = async (req, res) => {
  const sweet = await Sweet.findById(req.params.id);

  if (!sweet) {
    return res.status(404).json({ message: "Sweet not found" });
  }

  await sweet.deleteOne();
  res.json({ message: "Sweet deleted successfully" });
};

module.exports = {
  addSweet,
  getSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
};
// @desc Purchase a sweet
// @route POST /api/sweets/:id/purchase
// @access Protected
const purchaseSweet = async (req, res) => {
  const sweet = await Sweet.findById(req.params.id);

  if (!sweet) {
    return res.status(404).json({ message: "Sweet not found" });
  }

  if (sweet.quantity <= 0) {
    return res.status(400).json({ message: "Sweet out of stock" });
  }

  sweet.quantity -= 1;
  await sweet.save();

  res.json({
    message: "Sweet purchased successfully",
    remainingQuantity: sweet.quantity,
  });
};

// @desc Restock a sweet
// @route POST /api/sweets/:id/restock
// @access Admin only
const restockSweet = async (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid restock amount" });
  }

  const sweet = await Sweet.findById(req.params.id);

  if (!sweet) {
    return res.status(404).json({ message: "Sweet not found" });
  }

  sweet.quantity += amount;
  await sweet.save();

  res.json({
    message: "Sweet restocked successfully",
    quantity: sweet.quantity,
  });
};
module.exports = {
  addSweet,
  getSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet,
};
