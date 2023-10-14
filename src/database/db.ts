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
    }
    async  getPostById(id: number){
        const result = this.db.query(`Select * from posts WHERE id=${id}`).values()[0];
        return result;
        
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