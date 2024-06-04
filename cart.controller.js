const { carts } = require("./data");
const nextId = require("./helpers/nextId");

exports.AddToCarts = (req, res) => {
  const { userId, body } = req;
  const { id, name, price, image1, image2, quantity } = body.product;

  const existingItemIndex = carts.findIndex((item) => item.productId === id);

  if (existingItemIndex !== -1) {
    carts[existingItemIndex].quantity += quantity;
  } else {
    carts.push({
      cartId: nextId(carts),
      userId,
      productId: id,
      quantity,
      name,
      price,
      image1,
      image2,
    });
  }

  let cartNumber = carts.reduce((acc, product) => acc + product.quantity, 0);

  res.status(200).json({
    status: "success",
    cartNumber
  });
};

exports.CartNumber = (req, res) => {
  const { userId } = req;
  let cartNumber = 0;

  let userCart = carts.filter((item) => {
    if (item.userId === userId) {
      cartNumber += item.quantity;
    }
  });
  res.status(200).json({
    status: "success",
    data: {
      cartNumber
    }
  });
};

exports.UpdateQuantityCart = (req, res) => {
  const { userId, body } = req;
  const { productId, quantity } = body;

  const existingItemIndex = carts.findIndex(
    (item) => item.userId === userId && item.productId === productId
  );

  if (existingItemIndex !== -1) {
    carts[existingItemIndex].quantity = quantity;
  }

  res.status(200).json({
    status: "success",
  });
};

exports.DeleteCart = (req, res) => {
  const { userId, productId } = req;

  const productIndex = carts.findIndex(
    (item) => item.userId === userId && item.productId === productId
  );
  if (productIndex) {
    carts.splice(productIndex, 1);
  }

  res.status(201).json({
    status: "success",
  });
};

exports.TotalCart = (req, res) => {
  const { userId } = req;

  let subTotal = 0;
  let tax = 0;
  let total = 0;


  let userCart = carts.filter((cart) => {
    if (cart.userId === userId) {
      subTotal += cart.price * cart.quantity;
      tax += cart.price * 0.1 * cart.quantity;
      total = subTotal + tax;
    }
  });

  // let userCarts = carts.map((item) => {
  //   subTotal += item.price * item.quantity;
  //   tax += item.price * 0.1 * item.quantity;
  //   total = subTotal + tax;

  //   return {subTotal, tax, total};
  // });

  res.status(200).json({
    status: "success",
    data: {
      subTotal,
      tax,
      total,
    },
  });
};

exports.GetCart = (req, res) => {
  const { userId } = req;

  let shoppingCart = carts.filter((item) => item.userId === userId);
  console.log(shoppingCart);

  res.status(201).json({
    status: "success",
    data: {
      shoppingCart,
    },
  });
};
