const errorsMiddleware = (error,req,res,next)=>{
    if(
        error.status==500
    ){
        res.status(500).json({message:"Vérifier votre connexion et réessayez plus tard"})
    }
    next();
}
module.exports =errorsMiddleware;