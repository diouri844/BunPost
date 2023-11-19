import { Elysia } from "elysia";


const PREFIXER:string = "/api/moderate";


export default class ModerationRoutes {
    private app;
    constructor( app:Elysia ){
        this.app = app;
        this.setupRoutes();
    }
    private setupRoutes():void{
        this.app.get(PREFIXER, ()=>{});
        this.app.get(PREFIXER+"/author/:authorId",()=>{});
        this.app.get(PREFIXER+"/:postId", ()=>{});
        return;
    }
};
