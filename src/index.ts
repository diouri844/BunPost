import { Elysia } from "elysia";


import setupAuthorRoutes from "./services/author.service";
import setupPostRoutes from "./services/post.service";
import setupModerationRoutes from "./services/moderation.service";
import setupCommentRoutes from "./services/comment.service";
// import db class : 
import myDbInstance from "./database/setupDb";
// import faszify manager :
import authManger from "./utils/fastify.setup";

const app = new Elysia(authManger);


// setup Ping tester : 
//app.use(setupPostRoutes);
app.use(setupAuthorRoutes);
app.use(setupPostRoutes);
app.use(setupModerationRoutes);
app.use(setupCommentRoutes);

  app.listen("3000",
  async ()=>{
    // try to connect to the db : 
    myDbInstance.ping();
    console.log(
      `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
    );
  });


  
