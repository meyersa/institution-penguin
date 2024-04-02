// Select database
db = db.getSiblingDB('institution-penguin');

// Create players and scores table
db.createCollection("players")
db.createCollection("scores")

// Insert test data
db.players.insertOne({
    "id": 1,
    "score": 100,
    "email": "example@email.com",
    "displayName": "Lorem Ipsum",
    "creationDate": new Date(),
    "lastActivityDate": new Date()
})

db.scores.insertOne({
    "value": 100,
    "playerID": 1,
    "gameName": "flappypenguin",
    "timestamp": new Date()
})