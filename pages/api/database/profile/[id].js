import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Get credentials from ENV
            const { MONGODB_URL, MONGODB_DB } = process.env;

            // Connect to Mongo
            const client = await MongoClient.connect(MONGODB_URL);

            // Connect to specified DB
            const db = client.db(MONGODB_DB);

            // Parse ID from query
            const displayName = req.query.id;

            // Query MongoDB with findOne using the parsed ID
            const playerInfo = await db.collection('players').findOne(
                { displayName: displayName },
                {
                    projection: {
                        _id: 0, // Exclude the _id field
                        displayName: 1,
                        creationDate: 1,
                        lastActivityDate: 1
                    }
                }
            );
            
            // If there is no player
            if (!playerInfo) {
                res.status(404).json({ error: "Profile not found" });
                return 

            }

            // Calculate global rank
            const globalRank = await db.collection('players').countDocuments({
                totalScore: { $gt: playerInfo.totalScore }
            }) + 1;

            // Calculate global score from all game scores
            const globalScoreAggregate = await db.collection('scores').aggregate([
                { $match: { displayName: displayName } }, // Filter by displayName
                { $group: { _id: null, totalScore: { $sum: "$value" } } } // Calculate total score
            ]).toArray();
            const globalScore = globalScoreAggregate.length ? globalScoreAggregate[0].totalScore : 0;

            // Find their recent scores
            const recentScores = await db.collection("scores").aggregate([
                {
                    $match: { displayName: displayName } // Filter by displayName
                },
                {
                    $sort: { timestamp: -1 } // Sort by timestamp in descending order
                },
                {
                    $limit: 3 // Limit to the last 3 scores
                },
                {
                    $project: {
                        _id: 0,
                        value: 1,
                        gameName: 1,
                        timestamp: 1,
                    }
                }
            ]).toArray();

            // Combine the results 
            const combinedResult = {
                playerInfo,
                globalRank,
                globalScore,
                recentScores,

            };

            // Return Query Result with 200
            res.status(200).json(combinedResult);

        } catch (error) { // Error with query
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });

        }
    } else { // When not 'GET'
        res.status(405).json({ error: 'Method Not Allowed' });

    }
}