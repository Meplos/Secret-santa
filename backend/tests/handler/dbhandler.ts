import mongoose, { connect } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';


const mongod = new MongoMemoryServer();

export default class DbHandler {
    public static async connect() {
        const URI = await mongod.getUri();

        const mongooseOpt = {
            useNewUrlParser: true,
            autoReconnect: true,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 500,
        }

        await mongoose.connect(URI, mongooseOpt);

    }

    public static async closeDatabase() {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongod.stop();
    }

    public static async clearDatabase() {
        const collections = await mongoose.connection.collection;
        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany();
        }
    }
}


