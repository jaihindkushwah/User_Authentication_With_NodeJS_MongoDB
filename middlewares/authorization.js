const jwt=require('jsonwebtoken');
const authorization=(req,res,next)=>{
    const authToken=req.cookies.authToken;
    // console.log(authToken);
    if(!authToken){
        return res.status(403).json({message:'authentication invalid'})
    }
    try {
        const data=jwt.verify(authToken,process.env.JWT_KEY);
        res.userId=data.id;
        // console.log(data);
        next();
    } catch (error) {
        // console.log(error);
        res.status(403).json({message:'authentication invalid'})
    }
}
const authenticateHeaderToken=(req,res,next)=>{
    const headerToken=req.headers.authorization;
    
    if (!headerToken) {
        return res.status(401).json({ error: 'Unauthorized - Bearer token is missing' });
    }
    try {
        // console.log(headerToken)
        const data=jwt.verify(headerToken.replace("Bearer ",''),process.env.JWT_KEY);
        // const d=headerToken.replace('Bearer ','')
        // console.log(data);
        res.userId=data.id;
        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}
module.exports={authorization,authenticateHeaderToken};