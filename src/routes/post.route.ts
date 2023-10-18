import { Elysia, Context } from "elysia";

// import controllers : 
import { AddPost, GetPost, GetPostList, deletePost, getPostByAuthor } from "../controller/post.controller";

export function setupPostRoutes(app: Elysia) {
  app.get("/api/posts", GetPostList);
  app.get("/api/posts/author",getPostByAuthor);
  app.post("/api/posts", AddPost);
  app.get("/api/post/:postId", GetPost);
  app.delete("/api/post/:postId", deletePost);



  // Add more user-related routes as needed
}
