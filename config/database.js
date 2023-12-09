import mongoose from "mongoose";

const DBconnection = ()=>{ mongoose.connect(process.env.DBconnection)
    .then(result => {
        console.log(`Database Connected: ${result.connection.host}`);
    })
}
export default DBconnection ;