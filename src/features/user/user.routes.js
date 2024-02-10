import express from 'express';
import UserController from './user.controller.js';

const userRouter = express.Router();

const userController = new UserController();

userRouter.post("/signup",userController.signUp); //Register a new user Account
userRouter.post("/signin",userController.signIn); //login as a user

export default userRouter;