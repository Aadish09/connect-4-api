var jwt = require('jsonwebtoken')
module.exports = function(req,res,next){
    const token = req.headers['x-access-token'];
    if(token){
    jwt.verify(token,'Connect-4',(err,res)=>{
        if(err)res.send("Not a valid user");
        else{
            next();
        }
    })
}
}