import express from 'express';
import Postcontroller from './post.controller.js';
import { upload } from '../../middleware/fileupload-middleware.js';


const postRouter = express.Router();
const postController = new Postcontroller();

postRouter.get("/all",postController.getAllPost); //Retrive all Posts 
postRouter.get("/:id",postController.getPostId); //Retrive a specific post by ID
postRouter.get("/",postController.getPostUserId) // Retrive a posts based on user credentials
postRouter.post("/",upload.single('imageUrl'),postController.createPost) //Create a new post(Image upload functionality include)
postRouter.delete("/:id",postController.deletePost) //Delete a Specific post by ID
postRouter.put("/:id",upload.single('imageUrl'),postController.updatePost) //Update a Specific post by ID(Image upload functionality include)

export default postRouter;