const jwt=require('jsonwebtoken');
const jWT_Secrete="harryisgoodb$oy";

const fetchuser=(req,res,next)=>{
    
    const token=req.header('auth-token');
    if(!token){
        return res.status(401).send({errors:"please authenticate by using valid token"});
    }
    try {
        const data=jwt.verify(token,jWT_Secrete);
        req.user=data.user;
        next();

        
    } catch (error) {
        res.status(401).send({errors:"please authenticate by using valid token"})
        
    }
    

}
module.exports=fetchuser;