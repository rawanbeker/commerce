import brand from '../models/brandSchema.js'
import slugify from 'slugify';
import asyncHandler from'express-async-handler';
import ErrorApi from '../utils/apiError.js';
import ApiFeature from '../utils/apiFeature.js';
import deleteOne from '../controllers/deleteHandler.js'

//  creat brand post 
export const creatBerand = asyncHandler(async (req, res) => {

    const { name, age } = req.body;
    const ct = await brand.create({ name, age, slug: slugify(name) })
    // .then((result) => {
    res.status(200).json({ data: ct })
})

// view list brand get 
export const brandList = asyncHandler(async (req, res) => {

    const documenCount = await brand.countDocuments();
    const apiFeature = new ApiFeature(brand.find(), req.query).pagenation(documenCount).filter().sort().limitFields().search()

    //execute query
    const { moongoseQuery, pagenationResult } = apiFeature;
    const proList = await moongoseQuery;
    res.json({ results: proList.length, pagenationResult, data: proList });
})

// find brand with id get
export const brandId = asyncHandler(async (req,res,next)=>{
    const catId =await brand.findById(req.params.id)
    if (!catId) {
        return next(new ErrorApi(`error on id`, 404));
    }
    res.status(200).json({catId})
})

// update brand with id put
export const updatebrand = asyncHandler(async (req,res,next)=>{
const {name, age } =req.body;
const update=await brand.findByIdAndUpdate(req.params.id,{$set:{name,age,slug:slugify(name)}},{new :true})
    if (!update){
    return next(new ErrorApi(`error on id`, 404));
}
res.json({data:update});
})

//delete brand using id with find by id delete m delete
export const deletebrand = deleteOne(brand)


