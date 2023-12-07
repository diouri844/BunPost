import { Elysia } from "elysia";

// import my fastify instance :

import authManger from "../utils/fastify.setup";

const PREFIXER:string = "/api/auth";



// create my authentication class :

export default class AuthRoutes{
    private app;
    constructor( app:Elysia ){
        this.app = app;
        this.setupRoutes();
    };
    private setupRoutes():void{
        
    }
}