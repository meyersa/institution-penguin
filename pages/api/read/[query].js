import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Get credentials from ENV
      const { MONGODB_URL, MONGODB_DB } = process.env;

      // Connect to Mongo
      const client = await MongoClient.connect(MONGODB_URL);

      // Connect to specified DB
      const db = await client.db(MONGODB_DB);

      /*
       * Slug parsing
       * Since the query operations are similar, they are combined into one slug file
       * database/topplayers - Returns the 3 top players by score
       * database/highscores - Returns the 3 highest single game scores
       * database/recentscores - Returns the 3 most recent scores 
       */
      const { query } = req.query;

      let queryRes = {}
      switch (query) {
        case 'topplayers':
          queryRes = await db.collection('scores').aggregate([
            {
              $group: {
                _id: "$displayName",
                totalScore: { $sum: "$value" }, // Calculate total score for each player
              }
            },
            {
              $lookup: {
                from: "players",
                localField: "_id",
                foreignField: "displayName",
                as: "playerInfo"
              }
            },
            {
              $unwind: "$playerInfo"
            },
            {
              $sort: { totalScore: -1 }
            },
            {
              $limit: 3
            },
            {
              $project: {
                _id: 0,
                displayName: "$playerInfo.displayName",
                lastActivityDate: "$playerInfo.lastActivityDate",
                totalScore: 1,
              }
            }
          ]).toArray();

          break;

        case 'highscores':
          queryRes = await db.collection('scores').aggregate([
            {
              $group: {
                _id: { displayName: "$displayName", gameName: "$gameName" },
                maxScore: { $max: "$value" },
                timestamp: { $first: "$timestamp" } // Include timestamp field
              }
            },
            { $sort: { maxScore: -1 } },
            {
              $project: {
                _id: 0,
                displayName: "$_id.displayName",
                gameName: "$_id.gameName",
                maxScore: 1,
                timestamp: 1 // Project timestamp field
              }
            },
            {
              $group: {
                _id: null,
                topScores: { $push: { displayName: "$displayName", gameName: "$gameName", maxScore: "$maxScore", timestamp: "$timestamp" } }
              }
            },
            { $unwind: "$topScores" },
            { $limit: 3 },
            {
              $lookup: {
                from: "players",
                localField: "topScores.displayName",
                foreignField: "displayName",
                as: "playerInfo"
              }
            },
            { $unwind: "$playerInfo" },
            {
              $project: {
                _id: 0,
                displayName: "$topScores.displayName",
                gameName: "$topScores.gameName",
                maxScore: "$topScores.maxScore",
                displayName: "$playerInfo.displayName",
                timestamp: "$topScores.timestamp"
              }
            }
          ]).toArray();

          break;

        case 'recentscores':
          queryRes = await db.collection('scores').aggregate([
            { $sort: { timestamp: -1 } }, // Sort by timestamp in descending order
            { $limit: 3 }, // Limit to the top 3 scores
            {
              $lookup: {
                from: "players",
                localField: "displayName",
                foreignField: "displayName",
                as: "playerInfo"
              }
            },
            { $unwind: "$playerInfo" }, // Unwind the playerInfo array
            {
              $project: {
                _id: 0,
                displayName: "$displayName", // Prefix with $ to reference field from input document
                gameName: "$gameName", // Prefix with $ to reference field from input document
                score: "$value", // Prefix with $ to reference field from input document
                displayName: "$playerInfo.displayName", // Prefix with $ to reference field from embedded document
                timestamp: "$timestamp",
              }
            },
          ]).toArray();
          break;

        default:
          // Return 404
          res.status(404).json({ error: 'Route not found' })
          return

      }

      // Return scores with 200
      res.status(200).json(queryRes);

    } catch (error) { // Error with query
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });

    }
  } else { // When not 'GET'
    res.status(405).json({ error: 'Method Not Allowed' });

  }
}