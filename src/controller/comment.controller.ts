// define my comment controller : 




import { Context } from "elysia";
import IComment from "../interfaces/comment.inetrface";
import IPost from "../interfaces/post.interface";
import PostProvider from "../models/Post.model";
import CommentProvider from "../models/Comment.model";



export default class CommentController {
    async getComments( context:Context ): Promise<any>{
        // extract the post id from the context params :
        const { postId } = context.params;
        // chec if the post exists or not :
        const postResult:IPost|string = await PostProvider.getPostById(postId);
        if( typeof postResult === "string" ){
            return {
                message:"Post not found"
            }
        }
        // call the service to get the post comment :
        const CommentList:IComment[] = await CommentProvider.getPostComment(postId);
        return {
            data: CommentList
        };
    }
};