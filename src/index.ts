import { Elysia } from "elysia";

import { setupPostRoutes } from "./routes/post.route";
// import db class : 

import BunDatabase from "./database/db";

const app = new Elysia();
// setup db : 
app.decorate('db', new BunDatabase());


// setup Ping tester : 
  app.use(setupPostRoutes);


  app.listen("3000",()=>{
    console.log(
      `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
    );
  });


  
