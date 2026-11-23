require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./models/db');

require('./models/User');
require('./models/Product');
require('./models/Order');
require('./models/Favorite');

const authRoutes = require('./routers/authRoutes');
const productRoutes = require('./routers/productRoutes');
const orderRoutes = require('./routers/orderRoutes');
const favoriteRoutes = require('./routers/favoriteRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/favorites', favoriteRoutes);

sequelize.sync().then(() => {
  console.log('✅ Sequelize & SQLite synced successfully.');
  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
  });
});
