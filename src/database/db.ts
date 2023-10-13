// import post interface: 

import IPost from "../interfaces/post.interface";
// import bun sqlite module : 

import { Database } from 'bun:sqlite';

// define my database : 

export default class BunDatabase {
    private db : Database;
    constructor() {
        this.db = new Database('MyBunDb.db');
        // Initialize the database
        this.init()
            .then(
                () => console.log('Database initialized')
            )
            .catch( console.error );
    };
    async getBooks() {
        return this.db.query('SELECT * FROM posts').all();
    }
    // Initialize the database
    async init() {
        return this.db.run('CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, author TEXT)');
    };
}