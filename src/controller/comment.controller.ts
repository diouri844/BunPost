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
    // add new comment ( comment to a post ):
    async addComment( context:Context ):Promise<any>{
        // extract the post id from the context object :
        const { postId } = context.params;
        // check if the post exists or not :
        const postResult:IPost|string = await PostProvider.getPostById(postId);
        if( typeof postResult === "string" ){
            return {
                message:"Post not found"
            }
        }
        // extract the needed parameters from the context body:
        const authorId:string = context.body!.authorId;
        const body:string = context.body!.body;
        // check if authorId and body are valid :
        if (!authorId || !body ){
            return {
                message:"Invalid author id or body "
            }
        } 
        // now the post exist let add comment to it :
        const CommentAddResult:string|number = await CommentProvider.addCommentToPost(
            postId,authorId,body
        );
        if ( typeof CommentAddResult === "string" ){
            return {
                message : CommentAddResult
            }
        }
        return {
            message: "Comment added successfully"
        }
    }
    // add comment to comment : ( reply to comment by id)
    async replyToComment( context:Context ):Promise<any>{
        // extract the post id from the context object :
        const { commentId } = context.params;
        // check if the post exists or not :
        const commentResult:IComment|string = await CommentProvider.getCommentById( commentId);
        if( typeof commentResult === "string" ){
            return {
                message:"Comment not found"
            }
        }
        // make it done later :
    }
};