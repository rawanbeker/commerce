import { Router } from "express";
import { brandList, creatBerand, brandId, updatebrand, deletebrand } from "../controllers/brand.js"
import { ruleValidatorBrand, ruleCreateBrand, ruleDeleteBrand, ruleUpdateBrand } from "../utils/validators/brandvalidator.js"
import subCategoryRoute from './subCategoryRoute.js';
const router = new Router();
// @route GET api/users
router.use('/:brandId/subbrand', subCategoryRoute)

router.route('/')
    .get(brandList)
    .post(ruleCreateBrand, creatBerand);

router.get('/:id', ruleValidatorBrand, brandId);
router.put('/:id', ruleUpdateBrand, updatebrand)
router.delete('/:id', ruleDeleteBrand, deletebrand)
// 
// router.post('/', brand);
// router.get('/', brand);
export default router;