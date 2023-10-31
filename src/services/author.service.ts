import Elysia from "elysia";
import AuthorRoutes from "../routes/author.route";


export default function setupAuthorRoutes(app: Elysia) {
    return new AuthorRoutes(app);
};