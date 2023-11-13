import IPost from "../interfaces/post.interface";
import IAuthor from "../interfaces/author.interface";
import myDbInstance from "../database/setupDb";



export default class PostProvider {
    static async getPostById(postId: string): Promise<IPost|string>{
        return "";
    };
    static async getPostList():Promise<IPost[]>{
        let postList:IPost[] = [];
        const fetchresult = await myDbInstance.getDb().query(
            "SELECT * FROM Post"
        ).values();
        // cast data : 
        console.log( fetchresult );
        fetchresult.forEach(
            item=>{
                const post:IPost = {
                    id:Number(item[0]),
                    content:String(item[1]),
                    type:String(item[2]),
                    author:String(item[3])
                };
                postList.push(post);
            }
        );
        return postList;
    }

}


