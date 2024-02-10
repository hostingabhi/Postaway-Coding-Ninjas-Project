import PostModel from "./post.model.js";

export default class Postcontroller{
    getAllPost(req,res){
        const posts = PostModel.getpost();
        res.status(200).send(posts);
    }
    getPostId(req,res){
        const id = req.params.id;
        const posts = PostModel.postbyid(id);
        if(!posts){
            res.status(400).send("Post not found");
        }else{
            res.status(200).send(posts)
        }
    }
    getPostUserId(req,res,next){
        const userID = req.userID;
        const posts = PostModel.postbyUser(userID);
        if(!posts){
            res.status(400).send("User not found");
        }else{
            res.status(200).send(posts)
        }
    }
    createPost(req,res,next){
        const userID = req.userID;
        const {caption} = req.body;
        const imageUrl = req.file.filename;
        const newPost = PostModel.add(userID,caption,imageUrl)
        res.status(200).send(newPost);
    }
    deletePost(req,res,next){
        const id = req.params.id;
        const error = PostModel.delete(id);
        if(error){
            console.log(error);
            return res.status(400).send(error);
        }else{
            console.log('Iteam Sucessfully deleted')
            return res.status(200).send('Iteam Sucessfully deleted')
        }       
    }
    updatePost(req,res,next){
        const id = req.params.id;
        const {caption} = req.body;
        const imageUrl = req.file.filename;
        const updatePost = PostModel.update(id,caption,imageUrl)
        if(updatePost){
            console.log(updatePost);
            return res.status(400).send(updatePost);
        }else{
            console.log('Iteam Sucessfully update')
            return res.status(200).send('Iteam Sucessfully update')
        }
    }
}