
import { Context } from "elysia";
// define the post controller as callback function:
import IPost from "../interfaces/post.interface";
import PostProvider from "../models/Post.model";
import { STATUS_CODES } from "http";



export default class PostController{
    async AddPost(context:Context):Promise<IPost>{
        const createdPost:IPost = {
            content: "",
            type: "",
            author: ""
        };

        return createdPost;
    };
    async getPostByAuthor(context:Context):Promise<IPost[]>{
        let authorPostList:IPost[] = [];
        return authorPostList;
    };
    async getPostById(context:Context, response:Response){
        // extract postid from request context : 
        const { postId } = context.params;
        console.log(postId);
        const fetchResult:IPost|string = await PostProvider.getPostById(String(postId));
        return ({ data: fetchResult});
    };
    async getPostList():Promise<IPost[]>{
        const result:IPost[] = await PostProvider.getPostList();
        return result;
    };
    async deletePost(context:Context):Promise<string>{
        return "";
    }

}
