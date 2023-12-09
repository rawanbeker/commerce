import asyncHandler from 'express-async-handler';
import ErrorApi from '../utils/apiError.js';
import ApiFeature from '../utils/apiFeature.js';


const deleteOne = (Model) => asyncHandler(async (req, res) => {
    const DocumentDelete = await Model.findByIdAndDelete(req.params.id)
    if (!DocumentDelete) {
        return next(new ErrorApi(`error on id ${id}`, 404));
    }
    res.json({ data: DocumentDelete });
})

export default deleteOne;