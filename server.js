//1.import Libraries
import express from 'express';
import userRouter from './src/features/user/user.routes.js';
import postRouter from './src/features/post/post.routes.js';
import commentRouter from './src/features/comment/comment.routes.js';
import likeRouter from './src/features/like/like.routes.js';
import bodyParser from 'body-parser';
import jwtAuth from './src/middleware/jwt-middleware.js';
import { ApplicationError } from './src/middleware/error-handling-middleware.js';
import loggerMiddleware from './src/middleware/logger-middleware.js';

// Define port number
const port = 4000;

// Create Express server instance
const server = express();

// Middleware to parse JSON request bodies
server.use(bodyParser.json());

//All the routes to redirect the requests
server.use("/api",userRouter)
server.use("/api/posts",jwtAuth,loggerMiddleware,postRouter)
server.use("/api/comments",jwtAuth,loggerMiddleware,commentRouter)
server.use("/api/likes",jwtAuth,loggerMiddleware,likeRouter)

// Default route
server.get("/",(req,res)=>{
    res.send("Welcome to the Postaway Application")
})

//Error handler middleware
server.use((err,req,res,next)=>{
    console.log(err);
    if(err instanceof ApplicationError){
        res.status(err.code).send(err.message);
    }
    //serverError
    res.status(500).send("Something went wrong, please try again later")
})

//middleware to handle 404 request.
server.use((req,res)=>{
    res.status(404).send("API NOT FOUND.")
})

// Start the server
server.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})