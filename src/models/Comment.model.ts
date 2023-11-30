import myDbInstance from "../database/setupDb";
import IComment from "../interfaces/comment.inetrface";




export default class CommentProvider {
    static async getPostComment(postId:string): Promise<IComment[]>{
        let CommentList:IComment[] = [];
        const fetchResult = await myDbInstance.getDb().prepare(
            "SELECT * FROM Comment WHERE postId = ?"
        ).all(postId);
        fetchResult.forEach(
            item => CommentList.push(item as IComment)
        );
        return CommentList;
    }
}