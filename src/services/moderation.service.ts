import Elysia from "elysia";
import ModerationRoutes from "../routes/moderation.route";


export default function setupModerationRoutes( app: Elysia ){
    return new ModerationRoutes( app );
}