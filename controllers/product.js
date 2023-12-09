import prodectModel from '../models/productModel.js'
import slugify from 'slugify';
import asyncHandler from 'express-async-handler';
import ErrorApi from '../utils/apiError.js';
import ApiFeature from '../utils/apiFeature.js'
import deleteOne from '../controllers/deleteHandler.js'

// view list product method:get 
export const productList = asyncHandler(async (req, res) => {
   // build query
    const documenCount = await prodectModel.countDocuments(); 
    const apiFeature = new ApiFeature(prodectModel.find(), req.query).pagenation(documenCount).filter().sort().limitFields().search("prodectModel")

    //execute query
    const { moongoseQuery, pagenationResult }=apiFeature;
    const proList = await moongoseQuery;
    res.json({ results: proList.length, pagenationResult ,data: proList });
})

     // let moongoseQuery = prodectModel.find(JSON.parse(queryString))  
     // filter the product
        //* .where("price").equals(req.query.price)
        //* const proList = await prodectModel.find({price :req.query.price, ratingsAverage :req.query.ratingsAverage ,})
    // to transform the id of category to name of category and delete -_id
        // .skip(skip).limit(limit)
// to transform the id of category to name of category and delet _id
        // .populate({ path: 'category', select: 'name ' }) 
        


// find product with id method:get
export const productId = asyncHandler(async (req, res, next) => {
    const proId = await prodectModel.findById(req.params.id)
    // to transform the id of category to name of category
        .populate({ path: 'category', select: 'name ' })
    if (!proId) {
        return next(new ErrorApi(`error on id`, 404));    }
    res.status(200).json({ proId })
})

//  creat product method:post 
export const createProduct = asyncHandler(async (req, res) => {
    req.body.slug = slugify(req.body.title)
    const prCreate = await prodectModel.create(req.body)
    res.status(200).json({ data: prCreate })
})

// update product with id method:put
export const updateProduct = asyncHandler(async (req, res, next) => {
    if (req.body.title) {
        req.body.slug = slugify(req.body.title);
    }
    const update = await prodectModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    if (!update) {
        return next(new ErrorApi(`error on id`, 404));
    }

    res.json({ data: update });
})

//delete product using id with find by id delete method: delete
export const deleteProduct = deleteOne(prodectModel)



