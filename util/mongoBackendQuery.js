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
          profilePic: "$playerInfo.profilePic",
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
          profilePic: "$playerInfo.profilePic",
          timestamp: "$topScores.timestamp",
        },
      },
    ])
    .toArray();

  return queryRes;
}

export async function recentScores() {
  const queryRes = await ipCollection
    .collection("scores")
    .aggregate([
      { $sort: { timestamp: -1 } }, // Sort by timestamp in descending order
      { $limit: 3 }, // Limit to the top 3 scores
      {
        $lookup: {
          from: "players",
          localField: "displayName",
          foreignField: "displayName",
          as: "playerInfo",
        },
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
          profilePic: "$playerInfo.profilePic",
        },
      },
    ])
    .toArray();

  return queryRes;
}

export async function profileInfo(displayName) {
  // Query MongoDB with findOne using the parsed displayName
  const playerInfo = await ipCollection.collection("players").findOne(
    { displayName: displayName },
    {
      projection: {
        _id: 0, // Exclude the _id field
        displayName: 1,
        creationDate: 1,
        lastActivityDate: 1,
        profilePic: 1,
      },
    }
  );

  // If there is no player
  if (!playerInfo) {
    return;
  }

  // Calculate global rank
  const globalRank =
    (await ipCollection.collection("players").countDocuments({
      totalScore: { $gt: playerInfo.totalScore },
    })) + 1;

  // Calculate global score from all game scores
  const globalScoreAggregate = await ipCollection
    .collection("scores")
    .aggregate([
      { $match: { displayName: displayName } }, // Filter by displayName
      { $group: { _id: null, totalScore: { $sum: "$value" } } }, // Calculate total score
    ])
    .toArray();
  const globalScore = globalScoreAggregate.length ? globalScoreAggregate[0].totalScore : 0;

  // Find their recent scores
  const recentScores = await ipCollection
    .collection("scores")
    .aggregate([
      {
        $match: { displayName: displayName }, // Filter by displayName
      },
      {
        $sort: { timestamp: -1 }, // Sort by timestamp in descending order
      },
      {
        $limit: 3, // Limit to the last 3 scores
      },
      {
        $project: {
          _id: 0,
          value: 1,
          gameName: 1,
          timestamp: 1,
        },
      },
    ])
    .toArray();

  // Combine the results
  const combinedResult = {
    playerInfo,
    globalRank,
    globalScore,
    recentScores,
  };

  return combinedResult;
}

export async function loadQuestions() {
  const triviaRes = ipCollection.collection('triviaQuestions').find({}).toArray();

  return triviaRes
}