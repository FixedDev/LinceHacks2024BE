import {Db, MongoClient} from "mongodb";

export class DatabaseService {
    private conn: MongoClient;
    private _database?: Db;

    constructor() {
        this.conn = new MongoClient(process.env["MONGODB_URI"] ?? "")
    }

    async init() {
        await this.conn.connect();
        this._database = this.conn.db(process.env["MONGODB_DATABASE"] ?? "")
    }

    get database() {
        return this._database;
    }
}

export const databaseService: DatabaseService = new DatabaseService();