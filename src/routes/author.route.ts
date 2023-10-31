import { Elysia, Context } from "elysia";
import AuthorProvider from "../models/Author.model";

const PREFIXER:string = "/api/author";

export default class AuthorRoutes {
  private app;
    constructor(app: Elysia) {
    this.app = app;
    this.setupRoutes();
  }

  private setupRoutes() {
    this.app.get(PREFIXER, this.getAuthor);
    this.app.get(PREFIXER+"/post", this.getAuthorPosts);
    this.app.post(PREFIXER, this.createAuthor);
    this.app.get(PREFIXER+"/:authorId", this.getAuthorById);
    this.app.delete(PREFIXER+"/:authorId", this.deleteAuthor);
    // Add more user-related routes as needed
  }

  private getAuthor() {
    // extract id from context parameter:
        // try the static get method :
        const result = AuthorProvider.getAuthorById(1);
        console.log(result);
        return;
    }

  private getAuthorPosts() {
    // Your implementation for the /api/author/post GET route
  }

  private createAuthor() {
    // Your implementation for the /api/author POST route
  }

  private getAuthorById() {
    // Your implementation for the /api/author/:authorId GET route
  }

  private deleteAuthor() {
    // Your implementation for the /api/author/:authorId DELETE route
  }
}

