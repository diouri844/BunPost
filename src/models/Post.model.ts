
import Burm, { DataType } from "burm";
import IPost from "../interfaces/post.interface";


const PostModel = Burm.register<IPost>(
    "Post",
    [
        {
            field: "id",
            type: DataType.INTEGER,
            primary: true,
        },
        {
            field: "title",
            type: DataType.STRING,
            required:true
        },
        {
            field: "content",
            type: DataType.STRING,
            required:true
        },
        {
            field: "authorId",
            type: DataType.INTEGER,
            required:true,
            ref:"Author"            
        }
    ]
);

export default PostModel;




