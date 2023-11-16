import { Elysia } from "elysia";

import PostController from "../controller/post.controller";



const PREFIXER:string = "/api/post";


export default class PostRoutes {
  private app;
  constructor( app: Elysia ){
    this.app = app;
    this.setupRoutes();
  }
  private setupRoutes(): void{
    const PostProvider = new PostController();
    this.app.get(PREFIXER, PostProvider.getPostList);
    this.app.get(PREFIXER+"/author/:authorId",PostProvider.getPostByAuthor);
    this.app.post(PREFIXER+"/author/:authorId", PostProvider.AddPost);
    this.app.get(PREFIXER+"/:postId", PostProvider.getPostById);
    this.app.delete(PREFIXER+"/:postId", PostProvider.deletePost);
    return;
  };
}
