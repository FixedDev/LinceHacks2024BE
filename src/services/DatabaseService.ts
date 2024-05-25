import {Db, MongoClient} from "mongodb";

export class DatabaseService {
    private conn: MongoClient;
    private database?: Db;

    constructor() {
        this.conn = new MongoClient(process.env["MONGODB_URI"] ?? "")
    }

    async init() {
        await this.conn.connect();
        this.database = this.conn.db(process.env["MONGODB_DATABASE"] ?? "")
    }

}