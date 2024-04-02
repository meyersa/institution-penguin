keys = {};
speed = 2;
playerSheet = {};
playerId = Math.floor(Math.random() * 100);
activePlayers = new Map();

socket = io(undefined, {
    path: '/api/socket_io',
    
})

socket.on("addPlayer", (arg) => {
    for (i = 0; i < arg.length; i++) {
        addPlayer(arg[i]);

    }

    if (player.textures == playerSheet.walkNorth) {
        socket.emit("updatePos", [playerId, player.x, player.y, "n"]);

    }
    else if (player.textures == playerSheet.walkSouth) {
        socket.emit("updatePos", [playerId, player.x, player.y, "s"]);

    }
    else if (player.textures == playerSheet.walkEast) {
        socket.emit("updatePos", [playerId, player.x, player.y, "e"]);

    }
    else if (player.textures == playerSheet.walkWest) {
        socket.emit("updatePos", [playerId, player.x, player.y, "w"]);

    }
});

socket.on("updatePositions", (arg) => {
    updatePositions(arg);

});


function updatePositions(pos) {
    currPlayer = activePlayers.get(pos[0]);
    currPlayer.x = pos[1];
    currPlayer.y = pos[2];

    switch (pos[3]) {
        case "n":
            currPlayer.textures = playerSheet.walkNorth;
            // currPlayer.walkNorth;
            break;
        case "s":
            currPlayer.textures = playerSheet.walkSouth;
            // currPlayer.walkSouth;
            break;
        case "e":
            currPlayer.textures = playerSheet.walkEast;
            // currPlayer.walkEast;
            break;
        case "w":
            currPlayer.textures = playerSheet.walkWest;
            // currPlayer.walkWest;
            break;

    }
}


function addPlayer(id) {
    if (!activePlayers.has(id)) {
        activePlayers.set(id, createPlayer(id));

    }
}

//On Page Startup
function startScript() {

    //Initializing application
    app = new PIXI.Application(
        {
            resizeTo: window,
            backgroundColor: 0xAAAAAA,
            padding: 0,
            margin: 0

        }
    );

    document.getElementById("game").appendChild(app.view);

    //Load Background and Player Sprite
    app.loader.add("background", "/lobby/images/CPBackground.webp");
    app.loader.add("penguin", "/lobby/images/penguin-sheet2.png");
    app.loader.load(doneLoading);

    //Event Handlers
    window.addEventListener("keydown", keysDown);
    window.addEventListener("keyup", keysUp);

    keysDiv = document.querySelector("#game")

}

/*doneLoading
* Runs functions to load sprites after page has completed loading
*/
function doneLoading(e) {
    createBackground();
    createPlayerSheet();
    addPlayer(playerId);
    player = activePlayers.get(playerId);
    socket.emit("joined", playerId);
    app.ticker.add(gameLoop);

}


/*createPlayerSheet
*   Creates animations for the player
*/
function createPlayerSheet() {

    //Positioning of individual sprites on player sheet
    const frames = {
        "0": { "frame": { "x": 5, "y": 5, "w": 61, "h": 97 } },
        "1": { "frame": { "x": 75, "y": 5, "w": 55, "h": 94 } },
        "2": { "frame": { "x": 139, "y": 5, "w": 61, "h": 97 } },
        "12": { "frame": { "x": 209, "y": 5, "w": 49, "h": 94 } },
        "13": { "frame": { "x": 267, "y": 5, "w": 49, "h": 94 } },
        "14": { "frame": { "x": 325, "y": 5, "w": 49, "h": 94 } },
        "24": { "frame": { "x": 383, "y": 5, "w": 49, "h": 94 } },
        "25": { "frame": { "x": 441, "y": 5, "w": 49, "h": 94 } },
        "26": { "frame": { "x": 499, "y": 5, "w": 49, "h": 94 } },
        "36": { "frame": { "x": 557, "y": 5, "w": 61, "h": 97 } },
        "37": { "frame": { "x": 627, "y": 5, "w": 55, "h": 94 } },
        "38": { "frame": { "x": 691, "y": 5, "w": 61, "h": 97 } },
        // ... Add all other frame data from your JSON file here
        // Remember to include frames for all directions and animations
    };

    let ssheet = new PIXI.BaseTexture.from(app.loader.resources["penguin"].url);

    //Defines Animations
    playerSheet["standSouth"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(frames["1"].frame.x, frames["1"].frame.y, frames["1"].frame.w, frames["1"].frame.h))
    
    ];
    playerSheet["standWest"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(frames["13"].frame.x, frames["13"].frame.y, frames["13"].frame.w, frames["13"].frame.h))
    
    ];
    playerSheet["standEast"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(frames["25"].frame.x, frames["25"].frame.y, frames["25"].frame.w, frames["25"].frame.h))
    
    ];
    playerSheet["standNorth"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(frames["37"].frame.x, frames["12"].frame.y, frames["12"].frame.w, frames["12"].frame.h))
    
    ];

    playerSheet["walkSouth"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(frames["0"].frame.x, frames["0"].frame.y, frames["0"].frame.w, frames["0"].frame.h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(frames["2"].frame.x, frames["2"].frame.y, frames["2"].frame.w, frames["2"].frame.h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(frames["1"].frame.x, frames["1"].frame.y, frames["1"].frame.w, frames["1"].frame.h)),
        // Add other textures for walking south

    ];

    playerSheet["walkWest"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(frames["12"].frame.x, frames["12"].frame.y, frames["12"].frame.w, frames["12"].frame.h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(frames["14"].frame.x, frames["14"].frame.y, frames["14"].frame.w, frames["14"].frame.h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(frames["13"].frame.x, frames["13"].frame.y, frames["13"].frame.w, frames["13"].frame.h)),        // Add other textures for walking west

    ];

    playerSheet["walkEast"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(frames["24"].frame.x, frames["24"].frame.y, frames["24"].frame.w, frames["24"].frame.h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(frames["26"].frame.x, frames["26"].frame.y, frames["26"].frame.w, frames["26"].frame.h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(frames["25"].frame.x, frames["25"].frame.y, frames["25"].frame.w, frames["25"].frame.h)),

    ];

    playerSheet["walkNorth"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(frames["36"].frame.x, frames["36"].frame.y, frames["36"].frame.w, frames["36"].frame.h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(frames["38"].frame.x, frames["38"].frame.y, frames["38"].frame.w, frames["38"].frame.h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(frames["37"].frame.x, frames["37"].frame.y, frames["37"].frame.w, frames["37"].frame.h)),         // Add other textures for walking north

    ];
}

//Function to load player sprite
function createPlayer(id) {
    let newPlayer = new PIXI.AnimatedSprite(playerSheet.standSouth);
    newPlayer.anchor.set(0.5);
    newPlayer.animationSpeed = .2;
    newPlayer.loop = false;
    newPlayer.x = app.view.width / 2;
    newPlayer.y = app.view.height / 2;
    newPlayer.width = 50;
    newPlayer.height = 50;
    app.stage.addChild(newPlayer);
    newPlayer.play();
    // newPlayer = { ...newPlayer, id: id }
    return newPlayer;

}

//function to load background image
function createBackground() {
    //background image
    Background = PIXI.Sprite.from("/lobby/images/CPBackground.webp");
    Background.anchor.set(0.5);
    Background.x = app.view.width / 2;
    Background.y = app.view.height / 2;
    Background.width = app.view.width;
    Background.height = app.view.height;
    app.stage.addChild(Background)

    //transparent image to stop player from overlapping buildings in background image
    imageblnk = PIXI.Sprite.from("/lobby/images/trans-back.png");
    imageblnk.anchor.set(0.5);
    imageblnk.x = 700;
    imageblnk.y = 200;
    imageblnk.width = 1300;
    imageblnk.height = 160;
    app.stage.addChild(imageblnk)

}

//Function to detect and handle collision events
function handleCollision(object1, object2) {
    const obj1 = object1.getBounds();
    const obj2 = object2.getBounds();

    //if players touching
    if (obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y) {

        // Calculate the overlap between the player and the tree
        const overlapX = Math.min(obj1.x + obj1.width, obj2.x + obj2.width) - Math.max(obj1.x, obj2.x);
        const overlapY = Math.min(obj1.y + obj1.height, obj2.y + obj2.height) - Math.max(obj1.y, obj2.y);

        // Determine the direction of the collision
        if (overlapX < overlapY) {
            if (obj1.x < obj2.x) {
                object1.x -= overlapX;

            } else {
                object1.x += overlapX;

            }
        } else {
            if (obj1.y < obj2.y) {
                object1.y -= overlapY;

            } else {
                object1.y += overlapY;

            }
        }
    }
}


//Function to switch scenes when player follows path
function switchScenes() {
    if (player.y < 350 && player.y > 300 && player.x < 30) {
        speed = 0;
        //ADD REDIRECT LOCATION HERE
        window.location.href = "/minigame/minigame.html";

    }
}

//Function to keep player within app view
function checkBounds(object) {
    if (object.x > app.view.width) {
        object.x = app.view.width;

    } else if (object.x < 0) {
        object.x = 0;

    }

    if (object.y > app.view.height) {
        object.y = app.view.height;

    } else if (object.y < 0) {
        object.y = 0;

    }

}

//functions attached to event listener to detect key presses
function keysDown(e) {
    keys[e.keyCode] = true;

}
function keysUp(e) {
    keys[e.keyCode] = false;

}


//Function that loops every frame
function gameLoop() {

    //"W" key
    if (keys["87"]) {
        if (!player.playing) {
            player.textures = playerSheet.walkNorth;
            player.play();

        }
        player.y -= speed;
        socket.emit("updatePos", [playerId, player.x, player.y, "n"]);

    }
    //"A" key
    if (keys["65"]) {
        if (!player.playing) {
            player.textures = playerSheet.walkWest;
            player.play();

        }
        player.x -= speed;
        socket.emit("updatePos", [playerId, player.x, player.y, "w"]);

    }
    //"S" key
    if (keys["83"]) {
        if (!player.playing) {
            player.textures = playerSheet.walkSouth;
            player.play();

        }
        player.y += speed;
        socket.emit("updatePos", [playerId, player.x, player.y, "s"]);

    }
    //"D" key
    if (keys["68"]) {
        if (!player.playing) {
            player.textures = playerSheet.walkEast;
            player.play();

        }
        player.x += speed;
        socket.emit("updatePos", [playerId, player.x, player.y, "e"]);

    }

    checkBounds(player);

    //check if player is following trail to switch scenes
    switchScenes();

    //check for collision
    // handleCollision(player, imageblnk)

}



