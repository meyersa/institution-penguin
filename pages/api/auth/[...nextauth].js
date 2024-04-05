import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { MongoClient } from 'mongodb';

export default NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.AUTH_ID,
            clientSecret: process.env.AUTH_SECRET,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn(user) {

            // Store user data in MongoDB
            try {

                // Get information from signIn
                const authUsername = user.user.name 
                const authEmail = user.user.email 
                const authPic = user.user.image

                console.log(authUsername + " " + authEmail + " " + authPic)

                // Get credentials from ENV
                const { MONGODB_URL, MONGODB_DB } = process.env;

                // Connect to Mongo
                const client = await MongoClient.connect(MONGODB_URL);

                // Connect to specified DB
                const db = await client.db(MONGODB_DB);
                const players = db.collection('players')

                // Check if user already exists in the database
                const existingUser = await players.findOne({ email: authEmail });
                const nextPlayerID = players.find().sort({ "playerID": -1 }).limit(1) + 1;
                
                if (!existingUser) {

                    // Create a new user profile in MongoDB
                    await players.insertOne({
                        playerID: nextPlayerID,
                        email: authEmail,
                        displayName: authUsername,
                        profilePic: authPic,
                        creationDate: new Date(),
                        lastActivityDate: new Date(),

                    }).then(
                        console.log(`Created user ${authUsername} with the email ${authEmail}`)

                    );
                } else {

                    // Update recent date for existing user
                    players.updateOne(
                        { email: authEmail },
                        { $set: { lastActivityDate: new Date() } }

                    ).then(
                        console.log(`Updated user login for ${authEmail}`)

                    )
                }
            } catch (error) {
                console.error('Error storing user data:', error);

            }
            return true;

        },
    },
});