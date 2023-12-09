import { Router } from "express";
import { productList, createProduct, productId, updateProduct, deleteProduct } from "../controllers/product.js"
import { ruleValidatorProduct, ruleGeteProduct, ruleDeleteProduct, ruleUpdateProduct } from "../utils/validators/productValidator.js"
// import subProductRoute from './subProductRoute.js';
const router = new Router();
// // @route GET api/users
// router.use('/:ProductId/subProduct', subProductRoute)

router.route('/')
    .get(productList)
    .post(ruleValidatorProduct, createProduct);

router.get('/:id', ruleGeteProduct, productId);
router.put('/:id', ruleUpdateProduct, updateProduct)
router.delete('/:id', ruleDeleteProduct, deleteProduct)


export default router;