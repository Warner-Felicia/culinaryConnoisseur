const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/add-product', isAuth, adminController.getAddProduct); router.post(
  '/add-product',
  // [
  //   // body('title')
  //   //   .isString()
  //   //   .isLength({ min: 3 })
  //   //   .trim(),
  //   // body('description')
  //   //   .isLength({ min: 5, max: 400 })
  //   //   .trim(),
  //   // body('rating')
  //   //   .isNumeric(),
  //   // body('price').isFloat()
  // ],
  // isAuth,
  adminController.postAddProduct
);

router.get('/edit-product/:productID', isAuth, adminController.getEditProduct);
router.post(
  '/edit-product',
  // [
  //   // body('title')
  //   //   .isString()
  //   //   .isLength({ min: 3 })
  //   //   .trim(),
  //   //   body('description')
  //   //     .isLength({ min: 5, max: 400 })
  //   //     .trim(),
  //   //   body('rating')
  //   //     .isNumeric(),
  //   // body('price').isFloat()
  // ],
  // isAuth,
  adminController.postEditProduct
);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;