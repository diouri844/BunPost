// try to setup an sql database : using a sqlite db for testing purposes: 



import { Database } from "bun:sqlite";


class DatabaseProvider {
  private db: Database;
    constructor(){
        this.db = new Database('MyDatabaseInstance.sqlite');
        // Initialize the database
        this.init()
            .then(() => console.log('👀 Database initialized'))
            .catch(console.error);
    };
    ping():void{
      console.log('Ping started on database ');
      return;
    }
    getDb(){
      return this.db;
    }
    async init():Promise<void>{
      await this.initPost();
      await this.initAuthor();
      return;
    }
    async initPost() {
      return this.db.run(
        'CREATE TABLE IF NOT EXISTS "Post" (\
          "id"	INTEGER NOT NULL UNIQUE,\
          "content"	TEXT NOT NULL,\
          "type"	TEXT NOT NULL,\
          "author"	TEXT NOT NULL,\
          PRIMARY KEY("id" AUTOINCREMENT)\
        )'
      );
    }
    async initAuthor() {
      return this.db.run(
        'CREATE TABLE IF NOT EXISTS "Author" (\
          "id"	INTEGER NOT NULL UNIQUE,\
          "publicName"	TEXT NOT NULL UNIQUE,\
          "fullName"	TEXT NOT NULL,\
          "contact"	TEXT NOT NULL,\
          PRIMARY KEY("id" AUTOINCREMENT)\
        )'
      );
    }
};

// export an instance of the dbProvider : 
const myDbInstance = new DatabaseProvider();

export default myDbInstance;