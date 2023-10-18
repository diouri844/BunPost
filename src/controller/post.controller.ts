import Database from "bun:sqlite";
import { Context } from "elysia";

// define the post controller as callback function:
import DbInstance from "../database/db";
import IPost from "../interfaces/post.interface";


export const AddPost = async (context:Context)=>{
    // extract the body from the context object : 
    const { body }:IPost = context;

    if ( !body?.title || !body?.author ){
        throw new Error(" Title and author cannot be empty ");
    }
    const alreadyPosted = await DbInstance.alreadyPosted(body);
    if ( alreadyPosted ){
        try{
            // check it the post is already posted:
            const data:IPost = DbInstance.addNewPost(body);
            return {
                "message": "Post created successfully"
            }; 
        }catch( error ){
            console.log(error);
            throw new Error("Failed to add post ");
        }
    }else{
        return {
            "message": "Post already exist "
        }; 
    }
};

// add a get method to fetch all post with the same author : 
export const getPostByAuthor = async (context:Context):Promise<IPost[]>=>{
    const { query } = context;
    // extract data from the query : 
    const author:string = String(query.author);
    if ( !author){
        throw new Error("Author is required ");
    }
    try{
        // try to get all the posts related to this author: 
        const resultFetch = await DbInstance.getPostListByAuthor(author);
        return resultFetch;
    }catch( error ){
        console.log( error );
        throw new Error("Failed to get post list");
    };
}


export const deletePost = async ( context:Context )=>{
    // extract the post target id from params : 
    const { postId } = context.params;
    try{
        const deletedItem = await DbInstance.deletePostById( postId );
        return {
            "message":"Post deleted successufully "
        };
    }catch( error ){
        console.log( error );
        throw new Error("Failed to delete post");
    }
}




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