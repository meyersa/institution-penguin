// Select database
db = db.getSiblingDB('institution-penguin');

// Create players and scores table
db.createCollection("players")
db.createCollection("scores")

// Insert test data
if (process.env.ENVIRONMENT == "DEV") {
    db.players.insertMany([
        {
            "playerID": 1,
            "email": "example@email.com",
            "displayName": "Lorem Ipsum",
            "creationDate": new Date(),
            "lastActivityDate": new Date()
        },
        {
            "playerID": 2,
            "email": "example2@email.com",
            "displayName": "Dolor Sit",
            "creationDate": new Date(),
            "lastActivityDate": new Date()
        },
        {
            "playerID": 3,
            "email": "example3@email.com",
            "displayName": "Amet Consectetur",
            "creationDate": new Date(),
            "lastActivityDate": new Date()
        },
    ]);
    db.scores.insertMany([
        {
            "value": 100,
            "playerID": 1,
            "gameName": "flappypenguin",
            "timestamp": new Date()
        },
        {
            "value": 200,
            "playerID": 2,
            "gameName": "flappypenguin",
            "timestamp": new Date()
        },
        {
            "value": 150,
            "playerID": 3,
            "gameName": "flappypenguin",
            "timestamp": new Date()
        },
        {
            "value": 250,
            "playerID": 2,
            "gameName": "triviapenguin",
            "timestamp": new Date()
        },
    ]);
}