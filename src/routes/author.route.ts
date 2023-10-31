import { Elysia, Context } from "elysia";
import AuthorProvider from "../models/Author.model";
import IAuthor from "../interfaces/author.interface";

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

  private async getAuthor():Promise<{data:IAuthor[]}> {
    // extract id from context parameter:
        // try the static get method :
        const result:IAuthor[] = await AuthorProvider.getAuthorList();
        return {"data":result};
    }

  private getAuthorPosts() {
    // Your implementation for the /api/author/post GET route
  }

  private createAuthor() {
    // Your implementation for the /api/author POST route
  }

  private async getAuthorById( context:Context):Promise<{data:IAuthor|String}> {
    // Your implementation for the /api/author/:authorId GET route
    // extract the id from the request context : 
    const { authorId } = context.params;
    const result = await AuthorProvider.getAuthorById(String(authorId));
    return {"data":result};
  }

  private deleteAuthor() {
    // Your implementation for the /api/author/:authorId DELETE route
  }
}

