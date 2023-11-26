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
    static async getModerateByAuthor( author_id: string ):Promise<string[]>{
        let id_list: string[] = [];
        const result = await myDbInstance.getDb()
        .prepare( "SELECT id FROM Moderation WHERE authorId = ?")
        .all( author_id );
        console.log( result );
        return id_list
    }

    static async CreateNewModeration(
        authorId:string,
        postId:string,
        improved:boolean,
        pusblished:boolean
        ):Promise<any>{

    }

}