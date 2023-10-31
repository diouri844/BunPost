// import database istance :
import myDbInstance from "../database/setupDb";

// import post interface: 
import IAuthor from "../interfaces/author.interface";
// define my Author class provider :

class AuthorProvider{
    static async getAuthorById(authorId:Number): Promise<IAuthor>{
        const fetchResult = myDbInstance.getDb().run(
            `GET * FROM Author WHERE id = ${authorId}`
        );
        console.log( fetchResult );
        const author:IAuthor = {
            id:0,
            name:"test",
            contact:"string"
        };
        return author;
    }
} 


export default AuthorProvider;