const { categories } = require('./data');
const nextId = require('./helpers/nextId');

exports.getCategories = (req, res) => {
  const {
    category,
    brand, 
  } = req.query;

  res
    .status(200)
    .json({
      status: 'success',
      data: {
        categories,
      }
    });
};