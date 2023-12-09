import { createSubCategory, Subcategory, SubcategoryId, updateSubCategory, deletSubeCategory, addsubCategoryNest, allCategorySub } from "../controllers/subCategory.js"
import { ruleSubValidator, ruleCreateSubCategory, ruleDeleteSubCategory, ruleUpdateSubCategory } from "../utils/validators/subCategoryValidation.js"

import { Router } from "express";
// mergeParams :allow to access params from other route
// access categoryId from category route
const router = new Router({mergeParams: true});
// @route GET api/users

router.route('/')
    .get(allCategorySub,Subcategory)
    .post(addsubCategoryNest,ruleCreateSubCategory, createSubCategory);

router.get('/:id', ruleSubValidator, SubcategoryId);
router.put('/:id', ruleUpdateSubCategory, updateSubCategory)
router.delete('/:id', ruleDeleteSubCategory, deletSubeCategory)

export default router;