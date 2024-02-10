import jwt from 'jsonwebtoken';

const jwtAuth = (req, res, next)=>{
    //1. Read the Token.
        const token = req.headers["authorization"];
    //2. if no token , return the error.
        if(!token){
            return res.status(401).send('Unauthorized1');
        }
    //3. check if token is valid.
        try{
           const payload = jwt.verify(token,
            "PAWXPnEOAzxwBKEHmfJLiPO60JNHARea"
           );
           req.userID = payload.userID;
           console.log(payload); 
        }
        catch(err){
            //4. return error
            console.log(err);
            return res.status(401).send('Unauthorized2');
        }
    //5. call next middleware
    next();
}

export default jwtAuth;