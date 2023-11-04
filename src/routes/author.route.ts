import { Elysia, Context } from "elysia";
import AuthorProvider from "../models/Author.model";
import IAuthor from "../interfaces/author.interface";
import IPost from "../interfaces/post.interface";
import IauthorPayload from "../interfaces/author.dto";
import AuthorController from "../controller/ahuthor.controller";

const PREFIXER:string = "/api/author";

export default class AuthorRoutes {
  private app;
    constructor(app: Elysia) {
    this.app = app;
    this.setupRoutes();
  }

  private setupRoutes() {
    const authorProvider = new AuthorController();
    this.app.get(PREFIXER, authorProvider.getAuthor);
    this.app.get(PREFIXER+"/post/:authorId", authorProvider.getAuthorPosts);
    this.app.post(PREFIXER, authorProvider.createAuthor);
    this.app.get(PREFIXER+"/:authorId", authorProvider.getAuthorById);
    this.app.delete(PREFIXER+"/:authorId", authorProvider.deleteAuthor);
  }

}

