const { constants } = require("../constants");

exports.errorHandler = (err, req, res,next) =>{
    const statusCode = res.statusCode?res.statusCode:500;
    switch(statusCode){
        case constants.NOT_FOUND:
            res.json({title:"Not found",message:err.message,stacktrace:err.stack});
            break;
        case constants.VALIDATION_ERROR:
            res.json({title:"Validation error",message:err.message,stacktrace:err.stack});
            break;
        case constants.FORBIDDEN:
            res.json({title:"Forbidden",message:err.message,stacktrace:err.stack});
            break;
        case constants.UNAUTHORIZED:
            res.json({title:"Not Authorized",message:err.message,stacktrace:err.stack});
            break;
        case constants.SERVER_ERROR:
            res.json({title:"server error",message:err.message,stacktrace:err.stack});
            break;
        default:
            console.log('no error,all good');
            break;


    }
    
}