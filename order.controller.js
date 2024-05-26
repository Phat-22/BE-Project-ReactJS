const { orders } = require("./data");

exports.CheckOut = (req, res) => {
    const { userId, body } = req;
    const { items, subTotal, tax, total, name, address, phone, paymentMethod } = body;

    orders.push({
        user: userId,
        subTotal,
        items,
        tax,
        total,
        name,
        address,
        phone,
        paymentMethod,
        orderId: orders.length + 1, 
        date: new Date()
    });
    console.log(orders);
    res
        .status(201)
        .json({
            data: orders 
        });
};