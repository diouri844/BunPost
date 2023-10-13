import { Elysia, Context } from "elysia";

// import controllers : 
import { AddPost, GetPost, GetPostList } from "../controller/post.controller";

export function setupPostRoutes(app: Elysia) {
  app.get("/api/posts", GetPostList);

  app.post("/api/posts", AddPost);
  app.get("/api/post/:postId", GetPost);
  // Add more user-related routes as needed
}
