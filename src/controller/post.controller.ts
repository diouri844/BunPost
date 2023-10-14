import Database from "bun:sqlite";
import { Context } from "elysia";

// define the post controller as callback function:
import DbInstance from "../database/db";
import IPost from "../interfaces/post.interface";


export const AddPost = (context:Context)=>{
    // extract the body from the context object : 
    const { body } = context;

    if ( !body?.title || !body?.author ){
        throw new Error(" Title and author cannot be empty ");
    }
    try{
        const data:IPost = DbInstance.addNewPost(body);
        return {
            "message": "Post created successfully"
        }; 
    }catch( error ){
        console.log(error);
        throw new Error("Failed to add post ");
    }
};

export const GetPost = async (context:Context):Promise<IPost>=>{
    // extract params from context : 
    const { postId } = context.params;
    // get the post id from the params :
    try{
        const data = await DbInstance.getPostById(postId);
        const PostResult:IPost = {
            id: Number(data[0]),
            title: String(data[1]),
            author: String(data[2])
        };
        return PostResult
    }catch( error ){
        console.log( error );
        throw new Error ("Failed to retrive post ");
        
    }
};


export const GetPostList = async (context:Context):Promise<IPost[]>=>{
    try{
        const postList =  await DbInstance.getPosts();
        let result:IPost[] = [];
        postList.forEach( (post) => result.push( post ));
        return result;
    }catch( error ){
        console.log(error);
        throw new Error("Faild to get post list");
    }
};