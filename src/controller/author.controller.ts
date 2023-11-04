import { Context } from "elysia";
import IauthorPayload from "../interfaces/author.dto";
import IAuthor from "../interfaces/author.interface";
import IPost from "../interfaces/post.interface";
import AuthorProvider from "../models/Author.model";





export default class AuthorController {

  async getAuthor():Promise<{data:IAuthor[]}> {
    // extract id from context parameter:
    const result:IAuthor[] = await AuthorProvider.getAuthorList();
    return {"data":result};
  }

  async getAuthorPosts(context:Context):Promise<{data:IPost[]}> {
    // Your implementation for the /api/author/post GET route
    // extrat the id of the author : 
    const { authorId }= context.params;
    const result = await AuthorProvider.getAuthorPosts(String(authorId));
    const data:IPost[] = result ;
    return {"data":data};
  }

  async createAuthor(context:Context):Promise<{message: string, authorId: string}> {
    // Your implementation for the /api/author POST route
    let data:{message: string, authorId: string} = {message:"", authorId:""};
    try{
      // extract expected properties from payload:
      const authorPayload:IauthorPayload = context.body;
      console.log( authorPayload );
      if( !authorPayload.publicName || !authorPayload.fullName || !authorPayload.contact){
        throw new Error("fullName, publicName and contact is required");
      }
      // try now to create a new Author :
      const newAuthorId = await AuthorProvider.createNewAuthor(authorPayload);
      data.authorId = String(newAuthorId);
      data.message = "Autor Created Successufully"
      return data;
    }catch( error ){
      console.log( error );
      throw new Error("fullName, publicName and contact is required");
    }
  }

  async getAuthorById( context:Context):Promise<{data:IAuthor|String}> {
    // Your implementation for the /api/author/:authorId GET route
    // extract the id from the request context : 
    const { authorId } = context.params;
    const result = await AuthorProvider.getAuthorById(String(authorId));
    return {"data":result};
  }

  async deleteAuthor(context:Context):Promise<{message: string, authorId: string}> {
    // Your implementation for the /api/author/:authorId DELETE route
    const { authorId } = context.params;
    let data:{message: string, authorId: string} = {message:"", authorId:""};

    // make a call to the delete authore provider :
    try{
      await AuthorProvider.deleteAuthor( authorId );
      data.authorId = authorId;
      data.message = "Author/ posts deleted successfully";
      return data;
    }catch( error ){
      console.log( error );
      throw new Error( " Faild to delete author " );
    }
  }
}