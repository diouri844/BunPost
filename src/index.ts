import { Elysia } from "elysia";


import setupAuthorRoutes from "./services/author.service";
import setupPostRoutes from "./services/post.service";

// import db class : 
import myDbInstance from "./database/setupDb";

const app = new Elysia();


// setup Ping tester : 
//app.use(setupPostRoutes);
app.use(setupAuthorRoutes);
app.use(setupPostRoutes);

  app.listen("3000",
  async ()=>{
    // try to connect to the db : 
    myDbInstance.ping();
    console.log(
      `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
    );
  });


  
