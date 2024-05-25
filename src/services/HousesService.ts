import {DatabaseService} from "./DatabaseService";
import {House} from "../models/House";
import {Collection} from "mongodb";

export class HousesService {
    private collection: Collection<House>;

    constructor(private databaseService: DatabaseService) {
        this.collection = databaseService.database!
            .collection<House>("houses");
    }

    async findOne(id: string) {
        return await this.collection.findOne({where: {_id: id}});
    }

    save(data: House) {
        return this.collection.updateOne({where: {_id: data._id}}, data, {upsert: true});
    }
}