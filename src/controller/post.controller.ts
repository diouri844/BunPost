
import { Context } from "elysia";
// define the post controller as callback function:
import IPost from "../interfaces/post.interface";
import PostProvider from "../models/Post.model";
import IAuthor from "../interfaces/author.interface";
import AuthorProvider from "../models/Author.model";



export default class PostController{
    async AddPost(context:Context):Promise<{message:String, data: IPost}>{
        let response:{message:String, data: IPost} = {message: "", data: {
            content: "",
            type: "",
            author: ""
        }};
        const createdPost:IPost = {
            content: "",
            type: "",
            author: ""
        };
        // extract the author id form the context params :
        const { authorId } = context.params;
        // check if the author is existing : 
        const fetchAuthor:IAuthor|String = await AuthorProvider.getAuthorById(authorId);
        if ( typeof fetchAuthor === 'string') {
            response.message = "Author not found";
            return response;
        }
        // extract payload from context body :
        const payload:{content:string,type:string} = context.body as {content:string,type:string} ;
        // extract required items from payload : 
        const { content , type } = payload;
        if (!content || content.length === 0) {
            response.message = "Content required";
            return response;
        }
        if(!type || !["Public","Private"].includes(type) ){
            response.message = "Type required";
            return response;
        }
        response.data.content = payload.content;
        response.data.author = String(authorId);
        response.data.type = type;
        return response;
    };
    async getPostByAuthor(context:Context):Promise<{message:String, data: IPost[]}>{
        let response:{message:String, data: IPost[]} = {message: "", data: []};
        // extract the author id from request context :
        const { authorId } = context.params;
        // check if the author is existing :
        const fetchAuthor:IAuthor|String = await AuthorProvider.getAuthorById(authorId);
        if ( typeof fetchAuthor === 'string') {
            response.message = "Author not found";
        }
        // now is time to fetch the author posts : 
        const postsList:IPost[] = await PostProvider.getAuthorPostList(authorId);
        response.data = postsList;
        return response;
    };
    async getPostById(context:Context){
        // extract postid from request context : 
        const { postId } = context.params;
        console.log(postId);
        const fetchResult:IPost|string = await PostProvider.getPostById(String(postId));
        return ({ data: fetchResult});
    };
    async getPostList():Promise<IPost[]>{
        const result:IPost[] = await PostProvider.getPostList();
        return result;
    };
    async deletePost(context:Context):Promise<string>{
        return "";
    }

}
