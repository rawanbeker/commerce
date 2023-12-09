import { Router } from "express";
import { category, createCategory, categoryId, updateCategory, deleteCategory } from "../controllers/categroy.js"
import { ruleValidator, ruleCreateCategory, ruleDeleteCategory, ruleUpdateCategory } from "../utils/validators/categoryvalidator.js"
import subCategoryRoute from './subCategoryRoute.js';
const router = new Router();
// @route GET api/users
router.use('/:categoryId/subCategory', subCategoryRoute)

router.route('/')
    .get(category)
    .post(ruleCreateCategory,createCategory);

router.get('/:id',ruleValidator, categoryId);
router.put('/:id', ruleUpdateCategory, updateCategory)
router.delete('/:id', ruleDeleteCategory, deleteCategory)
// 
// router.post('/', category);
// router.get('/', category);
export default router;