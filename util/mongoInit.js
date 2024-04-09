import { MongoClient } from 'mongodb';

// Get credentials from ENV
const { MONGODB_URL, MONGODB_DB } = process.env;

// Connect to Mongo
const client = await MongoClient.connect(MONGODB_URL);

// Connect to specified DB
const ipCollection = client.db(MONGODB_DB);

export default ipCollection