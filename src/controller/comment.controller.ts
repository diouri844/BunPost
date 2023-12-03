// define my comment controller : 




import { Context } from "elysia";
import IComment from "../interfaces/comment.inetrface";
import IPost from "../interfaces/post.interface";
import PostProvider from "../models/Post.model";
import CommentProvider from "../models/Comment.model";



export default class CommentController {
    // Post Comment :
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
    // Comment replys :
    async getReplys( context: Context ):Promise<any> {
        // extract the comment id from the context params :
        const { commentId } = context.params;
        // check if the comment exist or not : 
        const commentTarget:IComment|string = await CommentProvider.getCommentById(commentId);
        if ( typeof commentTarget === 'string') {
            return {
                message : "Comment not found"
            }
        }
        // call the service to get all reply comments :
        const replyComments:IComment[] = await CommentProvider.getCommentsReplys(commentId);
        return {
            data: replyComments
        } 
    }
};