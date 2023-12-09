import express from "express";
import dotenv from "dotenv" ;
import  DBconnection from "./config/database.js";
import morgan from "morgan";
import categoryRoute from "./routes/categoryRoute.js"
import subCategoryRoute from "./routes/subCategoryRoute.js"
import productRoute from "./routes/productRoute.js"
import brandRoute from "./routes/brandRoute.js"
import ErrorApi from "./utils/apiError.js";
import errorMiddleware from "./middleware/errorMidleware.js"
const app = express();
dotenv.config()
const port = 27017;

app.use(express.json());
// express.urlencoded("extends"|true);

DBconnection();
if (process.env.NODE_ENV == "development") {
    app.use(morgan("dev"));
    console.log(`mode now is : ${process.env.NODE_ENV}`);
}else {
    app.use(morgan('combined'));
}

app.use('/api/category', categoryRoute);
app.use('/api/subCategory', subCategoryRoute);
app.use('/api/brand', brandRoute);
app.use('/api/product', productRoute);

// if you not fount the route api  which send to error middleware
    app.get('*', (req, res,next) =>{
            //    message,statues code
    next(new ErrorApi(`API Not Found ${req.originalUrl}`,400))
})

//global error handle middleware from folder middleware error for express
    app.use(errorMiddleware)

const server =app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


// handle rejection error out side of express
process.on('unhandledRejection',(err) => { console.log(`error of unhandledRejection ${err}`)
server.close(()=>{ process.exit(1)})
})