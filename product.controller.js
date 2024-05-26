const { products, brands, categories } = require('./data');
const nextId = require('./helpers/nextId');

exports.getProducts = (req, res) => {
  let productFilter = [...products];
  let {
    id_brand = '',
    id_category = ''
  } = req.query;

  if (id_brand) {
    const brand_name = brands.find(item => item.id === id_brand);
    productFilter = productFilter.filter(
      (item) => {
        return item.brand === brand_name.brand
      }
    )
  }

  if (id_category) {
    const category_name = categories.find(item => item.id === id_category)
    productFilter = productFilter.filter(
      (item) => {
        return item.category === category_name.category
      }
    )

  }

  res
    .status(200)
    .json({
      status: 'success',
      data: {
        productFilter,
      }
    });
};

exports.getProduct = (req, res) => { 
  let productDetail = [...products];
  let {
    id,
  } = req.params;
 
  if (id){
    productDetail = productDetail.filter((item) => {
      return item.id === Number(id)
   });
   
  }
  
  res
    .status(200)
    .json({
      status: 'success',
      data: {
        productDetail,
      }
    });
};