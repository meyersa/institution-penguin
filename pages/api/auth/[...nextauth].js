import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";

import { MongoClient } from "mongodb";

export default NextAuth({
   providers: [
      GithubProvider({
         clientId: process.env.GH_CLIENT_ID,
         clientSecret: process.env.GH_CLIENT_SECRET,
      }),
      DiscordProvider({
         clientId: process.env.DISCORD_CLIENT_ID,
         clientSecret: process.env.DISCORD_CLIENT_SECRET,
      }),
   ],
   callbacks: {
      async signIn({ user, account, profile }) {
         /*
          * Callback signIn is called on every user login
          *
          * First need to check if it is an existing user
          *
          * If it is
          * - Update access date
          * - Return true
          *
          * If it is not
          * - Check to see if name is unique
          * - Create user in players table
          * - Return true
          */

         // Print OAuth info in Dev
         if (process.env.ENVIRONMENT == "Dev") {
            console.log("signin user", user);
            console.log("signin account", account);
            console.log("signin profile", profile);
         }

         // Get user information
         const authPreUsername = user.name;
         const authEmail = user.email;
         const authPic = user.image;

         let uName = String(authPreUsername).trim().replace(" ", "_");

         // Get auth information
         const authProvider = account.provider;
         const authSubID = account.providerAccountId;

         /*
          * Connecting to MongoDB
          */
         let players;

         try {
            // Get credentials from ENV
            const { MONGODB_URL, MONGODB_DB } = process.env;

            // Connect to MongoDB
            const client = await MongoClient.connect(MONGODB_URL);

            // Connect to specified DB and collection
            const db = client.db(MONGODB_DB);
            players = db.collection("players");
         } catch (e) {
            console.error("Error connecting to Mongo Players connection", e);
            return false;
         }

         /*
          * Checking for existing user
          */
         let existingUser;

         try {
            // Lookup user information to see if it exists or not
            existingUser = await players.findOne({
               email: authEmail,
               authSubID: authSubID,
            });
         } catch (e) {
            console.error("Error validating user is unique", e);
            return false;
         }

         /*
          * Existing user
          * - Update last activity
          * - Return true
          */
         if (existingUser) {
            // Else existing user and update recent date
            const updatePlayer = await players.findOneAndUpdate(
               { email: authEmail, authSubID: authSubID },
               { $set: { lastActivityDate: new Date() } }
            );
            const updateName = updatePlayer.displayName;

            console.log(
               `Updated user login for ${updateName} from ${authProvider}, ${authSubID}`
            );
            return true;
         }

         /*
          * Non Existing user
          * - Check to see if name is unique
          * - Create user in players table
          * - Return true
          */

         /*
          * Check to see if name is unique for displayName
          * - If the name isn't unique add an incremented value to the end
          * - Continue to run while loop incrementing until that is met
          */
         try {
            let incrementValue = 0;

            while (await players.findOne({ displayName: uName })) {
               incrementValue++;
               uName = `${authPreUsername}_${incrementValue}`;
            }
         } catch (e) {
            console.error("Error validating unique name", e);
            return false;
         }

         // Set final validated name
         const authUsername = uName;

         /*
          * Add new user to MongoDB
          */

         // Create a new user profile in MongoDB
         await players.insertOne({
            authProvider: authProvider,
            authSubID: authSubID,
            email: authEmail,
            displayName: authUsername,
            profilePic: authPic,
            creationDate: new Date(),
            lastActivityDate: new Date(),
         });
         console.log(
            `Created user ${authUsername} from ${authProvider}, ${authSubID}`
         );
         return true;
      },
      async jwt({ token, user }) {
         if (process.env.ENVIRONMENT == "Dev") {
            console.log("jwt token", token);
            console.log("jwt user", user);
         }

         /*
          * If this is not a new token, do nothing
          */
         if (!user) {
            return token;
         }

         /*
          * If this is a new token, set displayName
          */
         try {
            // Get credentials from ENV
            const { MONGODB_URL, MONGODB_DB } = process.env;

            // Connect to MongoDB
            const client = await MongoClient.connect(MONGODB_URL);

            // Connect to specified DB and collection
            const db = client.db(MONGODB_DB);
            const players = db.collection("players");

            // Get playerInfo
            const playerFullInfo = await players.findOne({
               authSubID: user.id,
               email: user.email,
            });

            // Assign to token
            token.displayName = playerFullInfo.displayName;

            // Return new token
            return token;
         } catch (e) {
            console.error("Error connecting to Mongo Players connection", e);
            return false;
         }
      },
      async session({ session, token }) {
         if (process.env.ENVIRONMENT == "Dev") {
            console.log("session session", token);
            console.log("session token", token);
         }

         // Keep displayName token
         session.displayName = token.displayName;

         /*
          * Update user to reflect latest timestamp update
          */
         try {
            // Get credentials from ENV
            const { MONGODB_URL, MONGODB_DB } = process.env;

            // Connect to MongoDB
            const client = await MongoClient.connect(MONGODB_URL);

            // Connect to specified DB and collection
            const db = client.db(MONGODB_DB);
            const players = db.collection("players");

            // Update recent date
            await players.updateOne(
               { email: session.email, authSubID: session.sub },
               { $set: { lastActivityDate: new Date() } }
            );
         } catch (e) {
            console.error("Error connecting to Mongo Players connection", e);
            return false;
         }

         return session;
      },
   },
});
