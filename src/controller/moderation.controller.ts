

//define my moderate controller :

import { Context } from "elysia";
import PostProvider from "../models/Post.model";
import ModerateProvider from "../models/Moderation.model";
import IModerate from "../interfaces/moderate.interface";
import IPost from "../interfaces/post.interface";


export default class ModerationController {

    async ModeratePost( context:Context ):Promise<any>{
        //extract the post id from the contect :
        const { moderate_id } = context.params;
        // check if the moderate already exist or not :
        const resutl:IModerate|string = await ModerateProvider.getModerateById(moderate_id);
        if( typeof resutl === "string"){
            return {
                message:"Item not found"
            }
        }
        // extarct the post target id from the result :
        const postId:string = String(resutl.postId);
        // check if the post exist :
        const postResult:IPost|string = await PostProvider.getPostById(postId);
        if( typeof postResult === "string" ){
            return {
                message:"Post not found"
            }
        }
        console.log(postResult);
        // call the service to set the moderate state to true:
        const UpdateModerateState:IModerate|string = await ModerateProvider.ImprovePost(moderate_id);
        if( typeof UpdateModerateState === "string" ){
            return {
                message:UpdateModerateState,
                data:{}
            };
        }
        return { 
            message: "Post Improved Successfully",
            data: UpdateModerateState
         };
    };

    async DemoderatePost(context: Context):Promise<any>{
        //extract the post id from the contect :
        const { moderate_id } = context.params;
        // check if the moderate already exist or not :
        const resutl:IModerate|string = await ModerateProvider.getModerateById(moderate_id);
        if( typeof resutl === "string"){
            return {
                message:"Item not found"
            }
        }
        // extarct the post target id from the result :
        const postId:string = String(resutl.postId);
        // check if the post exist :
        const postResult:IPost|string = await PostProvider.getPostById(postId);
        if( typeof postResult === "string" ){
            return {
                message:"Post not found"
            }
        }
        const UpdateModerateState:IModerate|string = await ModerateProvider.UnimprovePost(moderate_id);
        if( typeof UpdateModerateState === "string" ){
            return {
                message:UpdateModerateState,
                data:{}
            };
        }
        return { 
            message: "Post Blocked Successfully",
            data: UpdateModerateState
        };
    };



    
    async PublishPost ( context:Context):Promise<any>{
        //extract the post id from the contect :
        const { moderate_id } = context.params;
        // check if the moderate already exist or not :
        const resutl:IModerate|string = await ModerateProvider.getModerateById(moderate_id);
        if( typeof resutl === "string"){
            return {
                message:"Item not found"
            }
        }
        // extarct the post target id from the result :
        const postId:string = String(resutl.postId);
        // check if the post exist :
        const postResult:IPost|string = await PostProvider.getPostById(postId);
        if( typeof postResult === "string" ){
            return {
                message:"Post not found"
            }
        }
        // check it the moderate target already improved : 
        if( resutl.improved === 1){
            // you can publish it now : 
            const UpdateModerateState:IModerate|string = await ModerateProvider.PublishPost(moderate_id);
            if( typeof UpdateModerateState === "string" ){
                return {
                    message:UpdateModerateState,
                    data:{}
                };
            }
            return { 
                message: "Post Published Successfully",
                data: UpdateModerateState
            };
        }
        // call the service to set the pusblished to true :
        return {
            message:"Post Not Improved yet "
        }
    };


    async UnPublishPost( context: Context): Promise<any> {
        //extract the post id from the contect :
        const { moderate_id } = context.params;
        // check if the moderate already exist or not :
        const resutl:IModerate|string = await ModerateProvider.getModerateById(moderate_id);
        if( typeof resutl === "string"){
            return {
                message:"Item not found"
            }
        }
        // extarct the post target id from the result :
        const postId:string = String(resutl.postId);
        // check if the post exist :
        const postResult:IPost|string = await PostProvider.getPostById(postId);
        if( typeof postResult === "string" ){
            return {
                message:"Post not found"
            }
        }
        // unpublishe service call : 
        const UpdateModerateState:IModerate|string = await ModerateProvider.Unpublishpost(moderate_id);
        if( typeof UpdateModerateState === "string" ){
            return {
                message:UpdateModerateState,
                data:{}
            };
        }
        return { 
            message: "Post Unpublished Successfully",
            data: UpdateModerateState
        };
    };

    async DeleteModerate( context: Context): Promise<any>{
        // extarct the target id from the context params:
        const { moderate_id }= context.params;
        // check if the moderate already exist or not :
        const resutl:IModerate|string = await ModerateProvider.getModerateById(moderate_id);
        if( typeof resutl === "string"){
            return {
                message:"Item not found"
            };
        }
        // extarct the post target id from the result :
        const postId:string = String(resutl.postId);
        // check if the post exist :
        const postResult:IPost|string = await PostProvider.getPostById(postId);
        if( typeof postResult === "string" ){
            return {
                message:"Post not found"
            }
        }
        // delete the current moderate target :
        const deletResutl:boolean = await ModerateProvider.DeleteModerateById(moderate_id);
        if ( deletResutl ){
            // delete the post related to the deleted moderation :
            const postTargetId:string = String(postResult.id);
            const deletePostState:boolean = await PostProvider.deletePost(postTargetId);
            if ( deletePostState ){
                return {
                    message: "Item deleted successfully and it's related posts",
                    data: {
                        itemId: moderate_id,
                        postId: postTargetId
                    }
                };
            }
        }else{
            return {
                message:"Failed to delete item"
            }
        };
    }






};