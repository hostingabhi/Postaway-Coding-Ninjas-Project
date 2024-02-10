import UserModel from "./user.model.js";
import jwt from 'jsonwebtoken'

export default class UserController{
    signUp(req,res){
        const{name, email, password}= req.body;
        const user = UserModel.signUp(name,email,password);
        res.status(201).send({message: "User Sucessfully Created",user});
        console.log("User Sucessfully Created")
    }
    
    signIn(req,res){
        const{email,password} = req.body;
        const result = UserModel.signIn(email,password);
        if(!result){
            return res.status(400).send("Invalid Credentials")
        }else{
            //1. create token
            const token = jwt.sign({userID: result.id, email: result.email},"PAWXPnEOAzxwBKEHmfJLiPO60JNHARea",{expiresIn:'1h',});

            //2. send token
            return res.status(200).send(token);
        }
    }
}