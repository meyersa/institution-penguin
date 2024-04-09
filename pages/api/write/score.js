/*
 * Upload score API endpoint
 * When a game is finished, this should be fetched with their score
 * Requires NextAuth session
 * Yes this is easily trickable, but something else in the future will be added to prevent abuse
 */
import { MongoClient } from "mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth].js";

export default async function handler(req, res) {
  // Only allow post
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Check to make sure user is authenticated
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Get credentials from ENV
  const { MONGODB_URL, MONGODB_DB } = process.env;

  // Connect to Mongo
  const client = await MongoClient.connect(MONGODB_URL);

  // Connect to specified DB
  const db = client.db(MONGODB_DB);

  // Verify input data
  const { score, gameName } = req.body;
  const parseScore = parseInt(score);
  const displayName = session.user.name;

  // If score is not an integer
  if (!parseScore) {
    return res.status(400).json({ error: "Invalid score" });
  }

  // If game doesn't exist
  if (!["flappypenguin", "triviapenguin", "pufflerecycler"].includes(gameName)) {
    return res.status(400).json({ error: "Game doesn't exist" });
  }

  // If displayName doesn't exist
  if (!displayName) {
    return res.status(400).json({ error: "Invalid display name" });
  }

  /*
   * Upload scores to MongoDB
   *
   * Value: Score from game (from body)
   * displayName: User's name (from session)
   * gameName: Game score is from (from body)
   * timestamp: Time of score (from here)
   */
  await db.collection("scores").insertOne({
    value: parseScore,
    displayName: displayName,
    gameName: gameName,
    timestamp: new Date(),
  });

  return res.status(200).json({ message: "Score uploaded successfully" });
}
