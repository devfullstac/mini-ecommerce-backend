const Favorite = require('../models/Favorite');
const Product = require('../models/Product');
const User = require('../models/User');

Favorite.belongsTo(Product, { foreignKey: 'productId' });
Favorite.belongsTo(User, { foreignKey: 'userId' });

exports.toggleFavorite = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  const existing = await Favorite.findOne({ where: { userId, productId } });
  if (existing) {
    await existing.destroy();
    return res.json({ message: 'Removed from favorites', liked: false });
  } else {
    await Favorite.create({ userId, productId });
    return res.status(201).json({ message: 'Added to favorites', liked: true });
  }
};

exports.getUserFavorites = async (req, res) => {
  const favorites = await Favorite.findAll({
    where: { userId: req.user.id },
    include: [Product]
  });
  res.json(favorites);
};

// للأدمن: جلب كل المنتجات المفضلة للمستخدمين
exports.getAllFavorites = async (req, res) => {
  const favorites = await Favorite.findAll({
    include: [Product, User],
    order: [['id', 'DESC']]
  });
  res.json(favorites);
};
