



export default interface IComment {
    id: number;
    body: string;
    postId: number;
    authorId: number;
    parentId?:number;
    at: Date;
};