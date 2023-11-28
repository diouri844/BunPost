import { Elysia } from "elysia";

const  PREFIXER:string = "/api/comment";





export default class CommentRoutes {
    private app;

    constructor( app: Elysia ){
        this.app = app;
        this.setupRoutes();
    };
    private setupRoutes():void{
        //get comment related to a post
        this.app.get(
            PREFIXER+"/:postId",
            ()=>{}
        );
        // get comment related to a comment ( replys ):
        this.app.get(
            PREFIXER+"/:commentId/Replys",
            ()=>{}
        );
        // add comment :
        this.app.post(
            PREFIXER+"/:postId",
            ()=>{}
        );
        // replaye to a comment :
        this.app.post(
            PREFIXER+"/Reply/:commentId",
            ()=>{}
        );
        // update a comment by id :
        this.app.put(
            PREFIXER+"/:commentId",
            ()=>{

            }
        );
        // remove a comment by id :
        this.app.delete(
            PREFIXER+"/:commentId",
            ()=>{}
        );
    };
};