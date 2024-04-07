// Select database
db = db.getSiblingDB('institution-penguin');

// Create players and scores table
db.createCollection("players")
db.createCollection("scores")

// Insert test data
db.players.insertOne(
    {
        "email": "admin@institutionpenguin.com",
        "displayName": "OG_Penguin",
        "creationDate": new Date('Wed Apr 03 2024 09:37:10 GMT-0400 (Eastern Daylight Time)'),
        "lastActivityDate": new Date('Wed Apr 03 2024 09:37:10 GMT-0400 (Eastern Daylight Time)')
    },
)
db.scores.insertMany([
    {
        "value": 100,
        "displayName": "OG_Penguin",
        "gameName": "flappypenguin",
        "timestamp": new Date('Wed Apr 03 2024 09:37:10 GMT-0400 (Eastern Daylight Time)')
    }
]);

// More data for Dev environment
if (process.env.ENVIRONMENT == "DEV") {
    db.players.insertMany([
        {
            "email": "example@email.com",
            "displayName": "Lorem_Ipsum",
            "creationDate": new Date(),
            "lastActivityDate": new Date()
        },
        {
            "email": "example2@email.com",
            "displayName": "Dolor_Sit",
            "creationDate": new Date(),
            "lastActivityDate": new Date('2024-04-04T05:36:39.370Z')
        },
        {
            "email": "example3@email.com",
            "displayName": "Amet_Consectetur",
            "creationDate": new Date(),
            "lastActivityDate": new Date('2024-04-04T05:36:39.370Z')
        },
        {
            "email": "example4@email.com",
            "displayName": "I_have_20_characters",
            "creationDate": new Date(),
            "lastActivityDate": new Date('2024-04-04T05:36:39.370Z')
        },
    ]);
    db.scores.insertMany([
        {
            "value": 100,
            "displayName": "Lorem_Ipsum",
            "gameName": "flappypenguin",
            "timestamp": new Date('2024-04-04T05:36:39.371Z')
        },
        {
            "value": 200,
            "displayName": "Dolor_Sit",
            "gameName": "flappypenguin",
            "timestamp": new Date('2024-04-04T05:36:39.371Z')
        },
        {
            "value": 150,
            "displayName": "Amet_Consectetur",
            "gameName": "flappypenguin",
            "timestamp": new Date('2024-04-04T05:36:39.371Z')
        },
        {
            "value": 250,
            "displayName": "Dolor_Sit",
            "gameName": "triviapenguin",
            "timestamp": new Date('2024-03-04T05:36:39.371Z')
        },
        {
            "value": 600,
            "displayName": "I_have_20_characters",
            "gameName": "triviapenguin",
            "timestamp": new Date('2024-02-04T05:36:39.371Z')
        },
    ]);
}