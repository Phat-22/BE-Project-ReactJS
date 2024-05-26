const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();


const productController = require('./product.controller');
const brandController = require('./brand.controller');
const categoryController = require('./category.controller');
const authController = require('./auth.controller');
const userController = require('./user.controller');
const cartController = require('./cart.controller');
const checkoutController = require('./order.controller')
const authenticateJWT = require('./middlewares/authenticateJWT');

const app = express();
app.use(express.static(`${__dirname}/public`));

const port = 3200;   

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('LetDiv');
});

app.post('/auth/signup', authController.signup);
app.post('/auth/login', authController.login);

app
  .route('/products')
  .get(productController.getProducts);

app
  .route('/product-details/:id')
  .get(productController.getProduct);

app
  .route('/brands')
  .get(brandController.getBrands);

app
  .route('/categories')
  .get(categoryController.getCategories);  

app.use(authenticateJWT); 

app
  .route('/users/me')
  .get(userController.getMe)
  .patch(
    userController.uploadAvatar,
    userController.updateMe
  );

app
  .route('/carts')
  .post(cartController.AddToCarts)
  .get(cartController.GetCart)
  .delete(cartController.DeleteCart)
  .patch(cartController.UpdateQuantityCart)

app
  .route('/cartNumber')
  .get(cartController.CartNumber);
  
app 
  .route("/total-cart")
  .get(cartController.TotalCart)

app
  .route("/checkout")
  .post(checkoutController.CheckOut)

app.listen(port, () => {
  console.log(`LetDiv app listening on port ${port}`)
});