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
                WHERE postId = ?\
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
    }
}