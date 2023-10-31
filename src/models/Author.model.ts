// import database istance :
import myDbInstance from "../database/setupDb";

// import post interface: 
import IAuthor from "../interfaces/author.interface";
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
    }


} 


export default AuthorProvider;