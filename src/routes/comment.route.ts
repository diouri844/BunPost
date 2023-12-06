import { Elysia } from "elysia";
import CommentController from "../controller/comment.controller";

const  PREFIXER:string = "/api/comment";





export default class CommentRoutes {
    private app;

    constructor( app: Elysia ){
        this.app = app;
        this.setupRoutes();
    };
    private setupRoutes():void{
        const CommentProvider = new CommentController();
        //get comment related to a post
        this.app.get(
            PREFIXER+"/:postId",
            CommentProvider.getComments
        );
        // get comment related to a comment ( replys ):
        this.app.get(
            PREFIXER+"/Comment/:commentId/Replys",
            CommentProvider.getReplys
        );
        // add comment :
        this.app.post(
            PREFIXER+"/:postId",
            CommentProvider.addComment
        );
        // replaye to a comment :
        this.app.post(
            PREFIXER+"/Reply/:commentId",
            CommentProvider.replyToComment
        );
        // update a comment by id :
        this.app.put(
            PREFIXER+"/:commentId",
            CommentProvider.updateComment
        );
        // remove a comment by id :
        this.app.delete(
            PREFIXER+"/:commentId",
            CommentProvider.deleteComment
        );
    };
};