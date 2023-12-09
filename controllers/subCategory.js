import subcategory from '../models/subSchema.js'
import slugify from 'slugify';
import asyncHandler from 'express-async-handler';
import ErrorApi from '../utils/apiError.js';
import ApiFeature from '../utils/apiFeature.js';
import deleteOne from '../controllers/deleteHandler.js'

export const addsubCategoryNest = (req, res, next) => {
    //  nest route if not send catId with name of subcat
    if (!req.body.category) req.body.category = req.params.categoryId;
    next();
}

//  creat category post 
export const createSubCategory = asyncHandler(async (req, res) => {

    const { name, category } = req.body;
    const ct = await subcategory.create({ name, slug: slugify(name), category })
    // to transformation the categoryId to category name => put it in query
    // .populate({ path: 'category', select: 'name -_id' })
    res.status(200).json({ data: ct })
})

// middleWare to create sub category if not write catId
export const allCategorySub = (req, res, next) => {
    // nest route  (sub &category)
    //  get   /api/category/:categoryid/subCategory
    var filterObject = {};
    if (req.params.categoryId) { filterObject = { category: req.params.categoryId } }
    req.filterObj = filterObject;
    next();
}

export const Subcategory = asyncHandler(async (req, res) => {
    const documenCount = await subcategory.countDocuments();
    const apiFeature = new ApiFeature(subcategory.find(), req.query).pagenation(documenCount).filter().sort().limitFields().search()

    //execute query
    const { moongoseQuery, pagenationResult } = apiFeature;
    const proList = await moongoseQuery;
    res.json({ results: proList.length, pagenationResult, data: proList });

})
// find category with id get
export const SubcategoryId = asyncHandler(async (req, res, next) => {
    const subcatId = await subcategory.findById(req.params.id)
    if (!subcatId) {
        return next(new ErrorApi(`error on id`, 404));
        // res.status(404).json({ msg: "error" })
    }
    res.status(200).json({ subcatId })
})

// update category with id put
export const updateSubCategory = asyncHandler(async (req, res, next) => {
    const { name, category } = req.body;
    // const {id}= req.params;
    // const upSubdate = await subcategory.findOneAndUpdate(id, { $set: { name, category, slug: slugify(name) } }, { new: true })

    const upSubdate = await subcategory.findByIdAndUpdate(req.params.id, { $set: { name, category, slug: slugify(name) } }, { new: true })
    if (!upSubdate) {
        return next(new ErrorApi(`error on id`, 404));
    }

    res.json({ data: upSubdate });
})
//delete category using id with find by id delete m delete

    export const deletSubeCategory = deleteOne(subcategory)



