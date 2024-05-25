import {Collection, Document, Filter, ObjectId, WithId} from "mongodb";
import {DatabaseService} from "./DatabaseService";

export class DataAccessObject<T extends Document> {
    private collection: Collection<T>;

    constructor(private databaseService: DatabaseService, collection: string) {
        this.collection = databaseService.database!
            .collection<T>(collection);
    }

    async findOneById(id: ObjectId): Promise<WithId<T> | null> {
        return await this.collection.findOne({where: {_id: id}});
    }

    async findOne(filter: Filter<T>) {
        return await this.collection.findOne(filter);
    }

    async find(filter: Filter<T>) {
        return this.collection.find(filter);
    }

    save(data: T) {
        return this.collection.updateOne({where: {_id: data["_id"]}}, data, {upsert: true});
    }

}