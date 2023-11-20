

//define my moderate controller :

import { Context } from "elysia";
import PostProvider from "../models/Post.model";


export default class ModerationController {

    async ModeratePost( context:Context ):Promise<void>{
        //extract the post id from the contect :
        const { moderate_id } = context.params;
        // check if the moderate already exist or not :
        
        // extarct the post target id from the result :

        // check if the post exist :
        
        // call the service to set the moderate state to true:

        return;
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