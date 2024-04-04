// Select database
db = db.getSiblingDB('institution-penguin');

// Create players and scores table
db.createCollection("players")
db.createCollection("scores")

// Insert test data
db.players.insertOne(
    {
        "playerID": 1,
        "email": "admin@institutionpenguin.com",
        "displayName": "OG Penguin",
        "creationDate": new Date('Wed Apr 03 2024 09:37:10 GMT-0400 (Eastern Daylight Time)'),
        "lastActivityDate": new Date('Wed Apr 03 2024 09:37:10 GMT-0400 (Eastern Daylight Time)')
    },
)
db.scores.insertMany([
    {
        "value": 100,
        "playerID": 1,
        "gameName": "flappypenguin",
        "timestamp": new Date('Wed Apr 03 2024 09:37:10 GMT-0400 (Eastern Daylight Time)')
    }
]);

// More data for Dev environment
if (process.env.ENVIRONMENT == "DEV") {
    db.players.insertMany([
        {
            "playerID": 2,
            "email": "example@email.com",
            "displayName": "Lorem Ipsum",
            "creationDate": new Date(),
            "lastActivityDate": new Date()
        },
        {
            "playerID": 3,
            "email": "example2@email.com",
            "displayName": "Dolor Sit",
            "creationDate": new Date(),
            "lastActivityDate": new Date('2024-04-04T05:36:39.370Z')
        },
        {
            "playerID": 4,
            "email": "example3@email.com",
            "displayName": "Amet Consectetur",
            "creationDate": new Date(),
            "lastActivityDate": new Date('2024-04-04T05:36:39.370Z')
        },
        {
            "playerID": 5,
            "email": "example4@email.com",
            "displayName": "I have 20 characters",
            "creationDate": new Date(),
            "lastActivityDate": new Date('2024-04-04T05:36:39.370Z')
        },
    ]);
    db.scores.insertMany([
        {
            "value": 100,
            "playerID": 2,
            "gameName": "flappypenguin",
            "timestamp": new Date('2024-04-04T05:36:39.371Z')
        },
        {
            "value": 200,
            "playerID": 3,
            "gameName": "flappypenguin",
            "timestamp": new Date('2024-04-04T05:36:39.371Z')
        },
        {
            "value": 150,
            "playerID": 4,
            "gameName": "flappypenguin",
            "timestamp": new Date('2024-04-04T05:36:39.371Z')
        },
        {
            "value": 250,
            "playerID": 3,
            "gameName": "triviapenguin",
            "timestamp": new Date('2024-03-04T05:36:39.371Z')
        },
        {
            "value": 600,
            "playerID": 5,
            "gameName": "triviapenguin",
            "timestamp": new Date('2024-02-04T05:36:39.371Z')
        },
    ]);
}