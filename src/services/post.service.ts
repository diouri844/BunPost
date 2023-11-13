import Elysia from "elysia"
import PostRoutes from "../routes/post.route"

export default function setupPostRoutes( app:Elysia ){
    return new PostRoutes( app );
};