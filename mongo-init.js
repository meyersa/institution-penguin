// Select database
db = db.getSiblingDB('institution-penguin');

// Create players and scores table
db.createCollection("players")
db.createCollection("scores")
db.createCollection("triviaQuestions")

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

db.triviaQuestions.insertMany([
    {"index":1, "question":"Penguins can fly.","answer":"false"},
    {"index":2, "question":"Penguins live only in cold climates.","answer":"false"},
    {"index":3, "question":"All penguins have black and white feathers.","answer":"false"},
    {"index":4, "question":"Penguins are mammals.","answer":"false"},
    {"index":5, "question":"Penguins are excellent swimmers.","answer":"true"},
    {"index":6, "question":"Emperor penguins are the largest species of penguins.","answer":"true"},
    {"index":7, "question":"Penguins lay eggs.","answer":"true"},
    {"index":8, "question":"Penguins are found only in the southern hemisphere.","answer":"false"},
    {"index":9, "question":"Penguins feed exclusively on fish.","answer":"false"},
    {"index":10, "question":"Penguins can regulate their body temperature.","answer":"true"},
    {"index":11, "question":"All penguins live in colonies.","answer":"false"},
    {"index":12, "question":"Penguins have highly developed senses of sight and hearing.","answer":"true"},
    {"index":13, "question":"Penguins use their wings to fly underwater.","answer":"true"},
    {"index":14, "question":"Penguins have waterproof feathers.","answer":"true"},
    {"index":15, "question":"Penguins are social animals.","answer":"true"},
    {"index":16, "question":"Penguins migrate annually.","answer":"true"},
    {"index":17, "question":"Penguins build nests out of sticks and twigs.","answer":"false"},
    {"index":18, "question":"Penguins are endangered species.","answer":"true"},
    {"index":19, "question":"Penguins have predators such as seals and orcas.","answer":"true"},
    {"index":20, "question":"Penguins communicate through vocalizations and body language.","answer":"true"},
    {"index":21, "question":"Penguins can hold their breath for over 15 minutes while diving.","answer":"true"},
    {"index":22, "question":"Penguins have knees.","answer":"true"},
    {"index":23, "question":"Penguins only live in Antarctica.","answer":"false"},
    {"index":24, "question":"Penguins have a gland above their eyes that filters excess salt.","answer":"true"},
    {"index":25, "question":"The Galápagos penguin is the only species of penguin found north of the equator.","answer":"true"},
    {"index":26, "question":"Penguins molt their feathers once a year.","answer":"true"},
    {"index":27, "question":"Penguins primarily eat krill.","answer":"false"},
    {"index":28, "question":"Penguins incubate their eggs by balancing them on their feet.","answer":"true"},
    {"index":29, "question":"Penguins have a great sense of smell.","answer":"false"},
    {"index":30, "question":"Penguins have been observed engaging in homosexual behavior.","answer":"true"},
    {"index":31, "question":"Penguins are monogamous.","answer":"false"},
    {"index":32, "question":"The African penguin is also known as the jackass penguin.","answer":"true"},
    {"index":33, "question":"Penguins can leap several feet out of the water.","answer":"true"},
    {"index":34, "question":"Climate change is not a significant threat to penguin populations.","answer":"false"},
    {"index":35, "question":"Penguin populations are declining due to overfishing.","answer":"true"},
    {"index":36, "question":"The Arctic is the natural habitat of penguins.","answer":"false"},
    {"index":37, "question":"Penguins are classified as marine birds.","answer":"true"},
    {"index":38, "question":"Penguins have a layer of blubber to help keep them warm in cold waters.","answer":"false"},
    {"index":39, "question":"Penguins have been depicted in ancient Peruvian art.","answer":"true"},
    {"index":40, "question":"Penguins use teamwork to catch fish.","answer":"true"},
    {"index":41, "question":"Penguins have a longer lifespan in captivity compared to the wild.","answer":"true"},
    {"index":42, "question":"Penguins can dive to depths of over 500 meters (1,640 feet).","answer":"true"},
    {"index":43, "question":"Penguins have specialized feathers that trap air, providing insulation while swimming.","answer":"true"},
    {"index":44, "question":"Penguins have sharp claws on their feet to help them grip on slippery surfaces.","answer":"true"},
    {"index":45, "question":"Penguins can't taste fish.","answer":"false"},
    {"index":46, "question":"Penguins can drink seawater.","answer":"false"},
    {"index":47, "question":"Penguins have an organ called the supraorbital gland that filters out excess salt from their bloodstream.","answer":"true"},
    {"index":48, "question":"Penguins moult all their feathers at once, which renders them unable to swim or hunt until the process is complete.","answer":"true"},
    {"index":49, "question":"Penguins have more feathers than most other birds.","answer":"true"},
    {"index":50, "question":"Penguins can sleep both on land and in the water.","answer":"true"},
    {"index":51, "question":"Penguins have been known to 'porpoise' while swimming, leaping out of the water to breathe while moving quickly.","answer":"true"},
    {"index":52, "question":"Penguins' black and white coloration helps camouflage them from predators both above and below water.","answer":"true"},
    {"index":53, "question":"Penguins have hollow bones, which help them stay buoyant in water.","answer":"false"},
    {"index":54, "question":"Penguins can't regulate their body temperature and rely solely on external factors to stay warm.","answer":"false"},
    {"index":55, "question":"Penguins have been observed using tools, such as rocks, to build nests.","answer":"true"},
    {"index":56, "question":"Penguins have a gland that produces an oily substance to help waterproof their feathers.","answer":"true"},
    {"index":57, "question":"Penguins are affected by oil spills, which can coat their feathers and make them unable to regulate their body temperature.","answer":"true"},
    {"index":58, "question":"Penguins' mating calls are unique to each individual and help them recognize their partners.","answer":"true"},
    {"index":59, "question":"Penguins' eggs are smaller than chicken eggs.","answer":"true"},
    {"index":60, "question":"Penguins can't blink, so they have a nictitating membrane to protect their eyes underwater.","answer":"true"},
    {"index":61, "question":"Penguins have a salt gland located above their eyes to help them excrete excess salt from their bodies.","answer":"true"},
    {"index":62, "question":"Penguins can travel long distances over land to reach their breeding grounds.","answer":"true"},
    {"index":63, "question":"Penguins have been observed stealing stones from other penguins' nests.","answer":"true"},
    {"index":64, "question":"Penguins have been found to have individual personalities, with some being more adventurous than others.","answer":"true"},
    {"index":65, "question":"Penguins' feathers are replaced during molting, ensuring they maintain their waterproofing and insulation properties.","answer":"true"},
    {"index":66, "question":"Penguins have taste buds at the back of their throats.","answer":"true"},
    {"index":67, "question":"Penguins have a special gland that helps them produce an oily substance to waterproof their feathers.","answer":"true"},
    {"index":68, "question":"Penguins' beaks are adapted to grasp slippery fish.","answer":"true"},
    {"index":69, "question":"Penguins' beaks change color during mating season.","answer":"true"},
    {"index":70, "question":"Penguins' feathers are tightly packed, providing excellent insulation against cold temperatures.","answer":"true"},
    {"index":71, "question":"Penguins are capable of recognizing individual humans.","answer":"true"},
    {"index":72, "question":"Penguins can detect predators both above and below the water surface.","answer":"true"},
    {"index":73, "question":"Penguins have been observed engaging in courtship rituals, such as bowing and preening.","answer":"true"},
    {"index":74, "question":"Penguins have a unique gland near their tails that secretes an oil to condition their feathers.","answer":"true"},
    {"index":75, "question":"Penguins have been found to exhibit social hierarchies within their colonies.","answer":"true"},
    {"index":76, "question":"Penguins' flippers are adapted for swimming, allowing them to propel through the water with ease.","answer":"true"},
    {"index":77, "question":"Penguins' internal body temperature can drop significantly during long dives, helping them conserve oxygen.","answer":"true"},
    {"index":78, "question":"Penguins have been observed sliding on their bellies as a form of locomotion on ice.","answer":"true"},
    {"index":79, "question":"Penguins' distinctive markings help them recognize each other within their colonies.","answer":"true"}
])
