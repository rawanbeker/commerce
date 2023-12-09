
//  class for operational error which can protect
export class ErrorApi extends Error{
    constructor(message,statuesCode){
        super(message);
        this.statusCode = statuesCode;
        this.status = `${statuesCode}`.startsWith(4) ? "fail" : "error";
        this.isOperational = true; 
    }
}

export default ErrorApi