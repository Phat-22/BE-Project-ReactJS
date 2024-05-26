const { brands } = require('./data');
const nextId = require('./helpers/nextId');

exports.getBrands = (req, res) => {
  // const {
  //   category, 
  //   brand,
  // } = req.query;

  res
    .status(200)
    .json({
      status: 'success',
      data: {
        brands,
      }
    });
};