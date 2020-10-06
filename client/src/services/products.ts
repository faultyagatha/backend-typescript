import axios from "axios";

// router.get('/', findAll)
export const getAllProducts = async () => {
  const products = await axios.get("http://localhost:5000/api/v1/products");
  console.log(products);
  return products;
};

// router.get('/:productId', findById)
