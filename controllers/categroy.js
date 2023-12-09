import models from '../models/schema.js'
import slugify from 'slugify';
import asyncHandler from'express-async-handler';
import ErrorApi from '../utils/apiError.js';
import ApiFeature from '../utils/apiFeature.js';
import deleteOne from '../controllers/deleteHandler.js'
//  creat category post 
export const createCategory = asyncHandler(async (req, res) => {

    const { name, age } = req.body;
    const ct = await models.create({ name, age, slug: slugify(name) })
    res.status(200).json({ data: ct })
})

// view list category get 
export const category = asyncHandler(async (req, res) => {
    const documenCount = await models.countDocuments();
    const apiFeature = new ApiFeature(models.find(), req.query).pagenation(documenCount).filter().sort().limitFields().search("models")

    //execute query
    const { moongoseQuery, pagenationResult } = apiFeature;
    const proList = await moongoseQuery;
    res.json({ results: proList.length, pagenationResult, data: proList });
})
// find category with id get
export const categoryId = asyncHandler(async (req,res,next)=>{
    const catId =await models.findById(req.params.id)
    if (!catId) {
        return next(new ErrorApi(`error on id`, 404));
    }
    res.status(200).json({catId})
})

// update category with id put
export const updateCategory = asyncHandler(async (req,res,next)=>{
const {name, age } =req.body;
const update=await models.findByIdAndUpdate(req.params.id,{$set:{name,age,slug:slugify(name)}},{new :true})
    if (!update){
    return next(new ErrorApi(`error on id`, 404));
}

res.json({data:update});
})

//delete category using id with find by id delete m delete
export const deleteCategory = deleteOne(models)

