import Elysia from "elysia";
import CommentRoutes from "../routes/comment.route";

export default function setupCommentRoutes( app:Elysia){
    return new CommentRoutes(app);
}