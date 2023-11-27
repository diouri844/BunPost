import myDbInstance from "../database/setupDb";
import IModerate from "../interfaces/moderate.interface";




export default class ModerateProvider {
    static async getModerateById(moderateId: string): 
    Promise<IModerate|string> {
        const target = await myDbInstance.getDb().
        query("SELECT * FROM Moderation WHERE id = ?")
        .get(moderateId);
        console.log(target);
        // check the result :
        if ( !target ){
            return "Not found";
        }
        return target as IModerate;
    };
    static async ImprovePost(moderate_id:string):
    Promise<IModerate|string>{
        try{
            await myDbInstance.getDb().prepare(
                "UPDATE Moderation\
                SET improved = 1\
                WHERE id = ?\
                "
            ).run(moderate_id);
            // fetch over the updated moderation:
            const target = await myDbInstance.getDb().
            query("SELECT * FROM Moderation WHERE id = ?")
            .get(moderate_id);
            return target as IModerate;
        }catch( error ){
            console.log( error );
            return "Can not Update State ";
        }
    };
    static async UnimprovePost( moderate_id: string):
    Promise<IModerate|string> {
        try{
            await myDbInstance.getDb().prepare(
                "UPDATE Moderation\
                SET improved = 0\
                WHERE id = ?\
                "
            ).run(moderate_id);
            // fetch over the updated moderation:
            const target = await myDbInstance.getDb().
            query("SELECT * FROM Moderation WHERE id = ?")
            .get(moderate_id);
            return target as IModerate;
        }catch( error ){
            console.log( error );
            return "Can not Update State ";
        }
    };
    static async PublishPost( moderate_id: string):
    Promise<IModerate|string> {
        try{
            await myDbInstance.getDb().prepare(
                "UPDATE Moderation\
                SET published = 1\
                WHERE id = ?\
                "
            ).run(moderate_id);
            // fetch over the updated moderation:
            const target = await myDbInstance.getDb().
            query("SELECT * FROM Moderation WHERE id = ?")
            .get(moderate_id);
            return target as IModerate;
        }catch( error ){
            console.log( error );
            return "Can not Update State ";
        }
    };
    static async Unpublishpost(moderate_id: string):
    Promise<IModerate|string> {
        try{
            await myDbInstance.getDb().prepare(
                "UPDATE Moderation\
                SET published = 0\
                WHERE id = ?\
                "
            ).run(moderate_id);
            // fetch over the updated moderation:
            const target = await myDbInstance.getDb().
            query("SELECT * FROM Moderation WHERE id = ?")
            .get(moderate_id);
            return target as IModerate;
        }catch( error ){
            console.log( error );
            return "Can not Update State ";
        }
    };
    static async DeleteModerateById( moderate_id: string): Promise<boolean> {
        try{
            await myDbInstance.getDb()
            .prepare(
                "DELETE FROM Moderation\
                WHERE id = ?"
            ).run(moderate_id);
            return true;
        }catch( error ){
            console.log( error );
            return false;
        }
    };

    static async getModerateListByAuthorId(author_id: string):Promise<string[]> {
        const resultList = await myDbInstance.getDb()
        .prepare( "SELECT id FROM Moderation WHERE authorId = ?")
        .all( author_id );
        let IdList: string[] = [];
        resultList.forEach(
            (item:any) => IdList.push(item.id)
        );
        return IdList;
    };

    static async BanAuthor( author_id: string ):Promise<string>{
        const resultList = await ModerateProvider.getModerateListByAuthorId(author_id);
        let checkResult = 0;
        await Promise.all(resultList.map(async (id: string) => {
            const result: IModerate | string = await ModerateProvider.UnimprovePost(id);
            if (typeof result === "object") {
              checkResult++;
            }
            return id;
        }));
        // check the final result :
        if ( checkResult === resultList.length ){
            return "Author Baned Successuflly";
        }
        return "Error Occured while blocking author "; 
    }



    static async HideAuthor( author_id: string):Promise<string> {
        return "";
    }

    static async CreateNewModeration(
        authorId:string,
        postId:string,
        improved:boolean,
        pusblished:boolean
        ):Promise<string>{
        // try to insert the new moderation item : 
        try{
            var improvedInsert:number = 0;
            var publishedInsert:number = 0;
            if( improved ){
                improvedInsert = 1;
            }
            if( pusblished ){
                publishedInsert = 1;
            }
            await myDbInstance.getDb().prepare(
                "INSERT INTO Moderation Values (Null,?,?,?,?)"
            ).run(
                postId,authorId,improvedInsert,publishedInsert
            );
            return "Moderation created successfully";
        }catch( error ){
            console.log( error );
            return "Could not insert moderation item";
        } 
    }

}