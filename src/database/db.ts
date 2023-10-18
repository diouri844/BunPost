// import post interface: 

import IPost from "../interfaces/post.interface";
// import bun sqlite module : 

import { Database } from 'bun:sqlite';

// define my database : 

class BunDatabase {
    private db : Database;
    constructor() {
        this.db = new Database('MyBunDb.db');
        // Initialize the database
        this.init()
            .then(
                () => console.log('🦊 Database initialized')
            )
            .catch( console.error );
    };
    async getPosts():Promise<IPost[]> {
        const result:IPost[] = this.db.query('SELECT * FROM posts').all();
        return result;
    };
    async alreadyPosted(PostPayload:IPost):Promise<Boolean> {
         // try to get the post by title
        const { title, author } = PostPayload; 
        const resultQuery = this.db.query(
            'SELECT * FROM posts WHERE title = ? AND author = ?' 
            )
            .get(title,author);
        console.log( resultQuery );
        return resultQuery === null
    };
    async getPostListByAuthor(author: string):Promise<IPost[]>{
        const resultQuery:IPost[] = [];
        const fetched = this.db.query('SELECT * FROM posts WHERE author = ?')
        .all(author);
        fetched.forEach( (post) => resultQuery.push(post));
        return resultQuery;
    }
    async  getPostById(id: number){
        const result = this.db.query(`Select * from posts WHERE id=${id}`).values()[0];
        return result;
        
    }
    async deletePostById(id: number): Promise<void>{
        const result = this.db.query('Delete from posts WHERE id= ?').get(id);
        return;
    }
    async addNewPost(PostPayload:IPost){
        const { title, author } = PostPayload;
        return this.db.query(`INSERT INTO posts (title, author) VALUES (?, ?) RETURNING id`).get(title,author);
    }
    async getPostByTitle(title: string) {}
    // Initialize the database
    async init() {
        return this.db.run('CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, author TEXT)');
    };
}


const DbInstance = new BunDatabase();
export default DbInstance;