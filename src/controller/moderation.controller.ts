

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
    
    async PublishPost ( context:Context):Promise<void>{
        //extract the post id from the contect :
        const { moderate_id } = context.params;
        // check if the moderate already exist or not :
       
        // check the result : 
        

        // check it the moderate target already improved : 

        // call the service to set the pusblished to true :
        
        return ;
    };






};