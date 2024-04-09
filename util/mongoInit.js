import { MongoClient } from 'mongodb';

// Get credentials from ENV
const { MONGODB_URL, MONGODB_DB } = process.env;

// MongoDB options
const options = {
    serverSelectionTimeoutMS: 10000,

}

let ipCollection; 

// Attempt to connect before startup (build condition)
try {
    // Connect to Mongo
    const client = await MongoClient.connect(MONGODB_URL, options);

    // Connect to specified DB
    ipCollection = client.db(MONGODB_DB);

} catch (e) {
    console.error("Unable to connect to MongoDB, ignore if this was during initial build")
    ipCollection = undefined;
    
}

export default ipCollection