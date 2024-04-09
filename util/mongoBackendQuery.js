import ipCollection from "./mongoInit";

export async function topPlayers() {
    const queryRes = await ipCollection
        .collection("scores")
        .aggregate([
            {
                $group: {
                    _id: "$displayName",
                    totalScore: { $sum: "$value" }, // Calculate total score for each player
                },
            },
            {
                $lookup: {
                    from: "players",
                    localField: "_id",
                    foreignField: "displayName",
                    as: "playerInfo",
                },
            },
            {
                $unwind: "$playerInfo",
            },
            {
                $sort: { totalScore: -1 },
            },
            {
                $limit: 3,
            },
            {
                $project: {
                    _id: 0,
                    displayName: "$playerInfo.displayName",
                    lastActivityDate: "$playerInfo.lastActivityDate",
                    totalScore: 1,
                },
            },
        ])
        .toArray();

    return queryRes;
}

export async function highScores() {
    const queryRes = await ipCollection
        .collection("scores")
        .aggregate([
            {
                $group: {
                    _id: { displayName: "$displayName", gameName: "$gameName" },
                    maxScore: { $max: "$value" },
                    timestamp: { $first: "$timestamp" }, // Include timestamp field
                },
            },
            { $sort: { maxScore: -1 } },
            {
                $project: {
                    _id: 0,
                    displayName: "$_id.displayName",
                    gameName: "$_id.gameName",
                    maxScore: 1,
                    timestamp: 1, // Project timestamp field
                },
            },
            {
                $group: {
                    _id: null,
                    topScores: {
                        $push: {
                            displayName: "$displayName",
                            gameName: "$gameName",
                            maxScore: "$maxScore",
                            timestamp: "$timestamp",
                        },
                    },
                },
            },
            { $unwind: "$topScores" },
            { $limit: 3 },
            {
                $lookup: {
                    from: "players",
                    localField: "topScores.displayName",
                    foreignField: "displayName",
                    as: "playerInfo",
                },
            },
            { $unwind: "$playerInfo" },
            {
                $project: {
                    _id: 0,
                    displayName: "$topScores.displayName",
                    gameName: "$topScores.gameName",
                    maxScore: "$topScores.maxScore",
                    displayName: "$playerInfo.displayName",
                    timestamp: "$topScores.timestamp",
                },
            },
        ])
        .toArray();

    return queryRes;
}

export async function recentScores() {
    const queryRes = await ipCollection.collection('scores').aggregate([
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

    return queryRes
}