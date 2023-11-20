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
        this.app.get(PREFIXER+"/author/:authorId",
            ()=>{}
        );
        this.app.get(PREFIXER+"/:postId", ()=>{});
        return;
    }
};
