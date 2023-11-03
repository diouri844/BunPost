// import database istance :
import myDbInstance from "../database/setupDb";
import IauthorPayload from "../interfaces/author.dto";

// import post interface: 
import IAuthor from "../interfaces/author.interface";
import IPost from "../interfaces/post.interface";
// define my Author class provider :

class AuthorProvider{
    static async getAuthorById(authorId:string): Promise<IAuthor|String>{
        let author:IAuthor|String = "";
        const fetchResult = await myDbInstance.
        getDb()
        .query(
            'SELECT * FROM Author WHERE id = ?',
        ).get(authorId);
        if ( !fetchResult ){
            author = "Not found";
        }else{
            author = fetchResult;
        }
        return author;
    };

    static async getAuthorList(): Promise<IAuthor[]>{
        let authorList:IAuthor[] = [];
        // fetch all the author in the database: 
        const fetchResult =  myDbInstance.getDb().query("SELECT * FROM Author").values();
        // map over all the author: 
        fetchResult.forEach(
            item => {
                const author:IAuthor = {
                    id:Number(item[0]),
                    publicName:String(item[1]),
                    fullName:String(item[2]),
                    contact:String(item[3])
                }
                authorList.push(author);
            }
        );
        return authorList;
    };

    static async getAuthorPosts(authorId:string):Promise<IPost[]>{
        const fetchResult = myDbInstance
        .getDb()
        .prepare(
            "Select * from post where author= ? "
        ).all(authorId);
        // print it : 
        //console.log( fetchResult);
        const postList:IPost[] = fetchResult;
        return postList;
    };

    static async createNewAuthor(authorPayload:IauthorPayload):Promise<any>{
        // prepar the databse query :
        try{
            const {publicName, fullName, contact } = authorPayload;
            myDbInstance.getDb().
            prepare(
                "Insert into Author Values (Null,?,?,?)"
            ).
            run(
                publicName,fullName,contact
            );
            const lastInsertId = myDbInstance.getDb().query('SELECT last_insert_rowid() as id').values()[0][0];
            return lastInsertId;
        }catch( error ){
            console.error(error);
            throw new Error("Failed to insert Author ");
        }
    }
} 

export default AuthorProvider;