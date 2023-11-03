import { Elysia, Context } from "elysia";
import AuthorProvider from "../models/Author.model";
import IAuthor from "../interfaces/author.interface";
import IPost from "../interfaces/post.interface";
import IauthorPayload from "../interfaces/author.dto";

const PREFIXER:string = "/api/author";

export default class AuthorRoutes {
  private app;
    constructor(app: Elysia) {
    this.app = app;
    this.setupRoutes();
  }

  private setupRoutes() {
    this.app.get(PREFIXER, this.getAuthor);
    this.app.get(PREFIXER+"/post/:authorId", this.getAuthorPosts);
    this.app.post(PREFIXER, this.createAuthor);
    this.app.get(PREFIXER+"/:authorId", this.getAuthorById);
    this.app.delete(PREFIXER+"/:authorId", this.deleteAuthor);
    // Add more user-related routes as needed
  }

  private async getAuthor():Promise<{data:IAuthor[]}> {
    // extract id from context parameter:
    const result:IAuthor[] = await AuthorProvider.getAuthorList();
    return {"data":result};
  }

  private async getAuthorPosts(context:Context):Promise<{data:IPost[]}> {
    // Your implementation for the /api/author/post GET route
    // extrat the id of the author : 
    const { authorId }= context.params;
    const result = await AuthorProvider.getAuthorPosts(String(authorId));
    const data:IPost[] = result ;
    return {"data":data};
  }

  private async createAuthor(context:Context):Promise<{message: string, authorId: string}> {
    // Your implementation for the /api/author POST route
    const data:{message: string, authorId: string} = {message:"", authorId:""};
    try{
      // extract expected properties from payload:
      const authorPayload:IauthorPayload = context.body;
      console.log( authorPayload );
      if( !authorPayload.publicName || !authorPayload.fullName || !authorPayload.contact){
        throw new Error("fullName, publicName and contact is required");
      }
      // try now to create a new Author :
      const newAuthorId = await AuthorProvider.createNewAuthor(authorPayload);
      return {
        message:"Autor Created Successufully", 
        authorId:newAuthorId
      }
    }catch( error ){
      console.log( error );
      throw new Error("fullName, publicName and contact is required");
    }
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

