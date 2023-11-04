
import IPost from "../interfaces/post.interface";


export default class PostProvider {
    static async getPostById(postId: string): Promise<IPost|string>{
        return "";
    };
}


