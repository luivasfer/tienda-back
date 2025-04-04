const express = require('express');
const sequelize = require('./config/database');
const Product = require('./models/product');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

// Rutas de prueba
app.get('/', (req, res) => {
  res.send('¡Tienda básica funcionando!');
});

// Ruta API para obtener todos los productos
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


sequelize.sync({ force: true }) 
  .then(async () => {
    console.log('Base de datos sincronizada');

    
    await Product.bulkCreate([
      { name: 'Laptop', description: 'Laptop de alta gama', price: 999.99, stock: 10 },
      { name: 'Teléfono', description: 'Smartphone 5G', price: 499.99, stock: 25 },
      { name: 'Auriculares', description: 'Auriculares inalámbricos', price: 79.99, stock: 50 },
    ]);

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar con la base de datos:', error);
  });