import myDbInstance from "../database/setupDb";
import IComment from "../interfaces/comment.inetrface";




export default class CommentProvider {
    // get Comment by id :
    static async getCommentById(commentId: number): Promise<IComment|string>{
        const target = await myDbInstance.getDb()
        .prepare("SELECT * FROM Comment WHERE id = ?").get(commentId);
        if( !target ){
            return "Not found";
        }
        return target as IComment;
    }
    // static method to get post comment :
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
    // static method to get replys on a comment :
    static async getCommentsReplys(commentId:string): Promise<IComment[]>{
        let CommentList:IComment[] = [];
        const fetchResult = await myDbInstance.getDb().prepare(
            "SELECT * FROM CommentList WHERE parentId = ? "
        ).all(commentId);
        // fetch over respose and push them to the result list :
        fetchResult.forEach(
            item => CommentList.push(item as IComment)
        );
        return CommentList;
    }
    // static method to get user (author ) comment :
    static async getUserComment(authorId:string):Promise<IComment[]> {
        let CommentList:IComment[] = [];
        const fetchResult = await myDbInstance.getDb().prepare(
            "SELECT * FROM Comment WHERE authorId = ?"
        ).all(authorId);
        fetchResult.forEach(
            item => CommentList.push(item as IComment)
        );
        return CommentList;
    };
    //static method to add comment to a post :
    static async addCommentToPost(
        postId: string,
        authorId: string,
        body: string
    ):Promise<string|number>
    {
        try{
            // create new date and parse is as an string :
            const strDate = String(new Date());
            // insert new comment :
            await myDbInstance.getDb()
            .prepare(
                "Insert into Comment Values (Null,?,?,?,?,?)"
            ).run(
                body,strDate,0,postId,authorId
            );
            // get the inserted comment id :
            const lastInsertId = myDbInstance.getDb().query('SELECT last_insert_rowid() as id').values()[0][0];
            return Number(lastInsertId);
        }catch( error ){
            console.log( error );
            return " Failed to add comment ";
        }
    };
}