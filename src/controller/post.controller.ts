import { Context } from "elysia";


// define the post controller as callback function:



export const AddPost = (context:Context)=>{
    return {"message":"Add new  Post alive "}
};

export const GetPost = (context:Context)=>{
    return {"message":"Get Post by id"}
};


export const GetPostList = (context:Context)=>{
    return {"message":"Get Post List"};
};