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
        const authorId:string = context.body!.authorId;
        const body:string = context.body!.body;
        // check if authorId and body are valid :
        if (!authorId || !body ){
            return {
                message:"Invalid author id or body "
            }
        } 
        // make it done later :
        const CommentAddResult:string|number = await CommentProvider.addCommentToComment(
            commentId,authorId,body
        );
        if ( typeof CommentAddResult === "string"){
            return {
                message: CommentAddResult
            }
        }
        return {
            message : "Comment added successfully"
        }
    }
    // update comment : only body content :
    async updateComment( context: Context ):Promise<any>{
        // extract the comment id from the context params : 
        const { commentId } = context.params;
        // check if the comment exists :
        const target:string|IComment = await CommentProvider.getCommentById(commentId);
        if ( typeof target === "string"){
            return {
                message: target
            }
        }
        // extract the new comment body from the context body :
        const body:string = context.body?.body;
        if ( !body ){
            return {
                message: "No body was provided"
            }
        }
        const updatedCommentResult:string|IComment = await CommentProvider.updateComment(commentId,body);
        // check the result :
        if ( typeof updatedCommentResult === "string"){
            return {
                message : updatedCommentResult
            }
        }
        return {
            message: "Comment updated successfully",
            data: updatedCommentResult
        }
    }

    // delete a comment :
    async deleteComment ( context: Context ):Promise<any>{
        // extract the comment id from the context params : 
        const { commentId } = context.params;
        // check if the comment exists :
        const target:string|IComment = await CommentProvider.getCommentById(commentId);
        if ( typeof target === "string"){
            return {
                message: target
            }
        }
        // comment already exists let delete it :
        const deleteCommentResponse:boolean = await CommentProvider.deleteComment(commentId);
        if( deleteCommentResponse ){
            return {
                message : "Comment deleted successfully"
            }
        }
        return {
            message: "failed to delete comment"
        }
    }
};