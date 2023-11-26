import { Elysia } from "elysia";
import ModerationController from "../controller/moderation.controller";


const PREFIXER:string = "/api/moderate";


export default class ModerationRoutes {
    private app;
    constructor( app:Elysia ){
        this.app = app;
        this.setupRoutes();
    }
    private setupRoutes(){
        // setup an instance for the controller : 
        const ModerateProvider = new ModerationController();
        this.app.get(PREFIXER,()=>{ return "Moderate Ping";});
        this.app.get(
            PREFIXER+"/Improve/:moderate_id", 
            ModerateProvider.ModeratePost
        );
        this.app.get(
            PREFIXER+"/Unimprovement/:moderate_id",
            ModerateProvider.DemoderatePost
        );
        this.app.get(
            PREFIXER+"/Publish/:moderate_id",
            ModerateProvider.PublishPost
        );
        this.app.get(
            PREFIXER+"/Unpublish/:moderate_id",
            ModerateProvider.UnPublishPost
        );
        this.app.delete(
            PREFIXER+"/:moderate_id",
            ModerateProvider.DeleteModerate
        );
        this.app.get(PREFIXER+"/Ban/:authorId",
            ModerateProvider.BlockAuthor
        );
        this.app.post(PREFIXER+"/New/:authorId/:postId", 
            ModerateProvider.CreateNewModeration
        );
        return;
    }
};
