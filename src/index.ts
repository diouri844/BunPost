import { Elysia } from "elysia";

const app = new Elysia();


// define routes : 


app.get(
  "/api/ping",
  (context) =>{
    console.log("\n");
    return {"message":"Ping Pong alysia alive "}
  });

app.post(
  "/api/post",
  (context) =>{
    const { body } = context;
    console.log(body);
    return {
      "message":" post it by alisya post ",
      "body": body
    }
    ;
  }
);


  app.listen("3000",()=>{
    console.log(
      `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
    );
  });


  
