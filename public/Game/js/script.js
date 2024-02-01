let app;
let player;
let Background;
let keys = {};
let keysDiv;
let speed = 2;
let playerSheet = {};

//On Page Startup
window.onload = function () {

    //Initializing application
    app = new PIXI.Application(
        {
            //width: 800,
            //height: 600,
            resizeTo: window,
            backgroundColor: 0xAAAAAA,
            padding: 0,
            margin: 0

        }
    );

    document.body.appendChild(app.view);

    //Load Background and Player Sprite
    app.loader.add("background", "./Images/CPBackground.webp");
    app.loader.add("penguin", "./Images/penguin-sheet2.png");
    app.loader.load(doneLoading);

    //Event Handlers
    window.addEventListener("keydown", keysDown);
    window.addEventListener("keyup", keysUp);

    keysDiv = document.querySelector("#keys")
}

/*doneLoading
* Runs functions to load sprites after page has completed loading
*/
function doneLoading(e) {
    createBackground();
    createPlayerSheet();
    createPlayer();
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
function createPlayer() {
    player = new PIXI.AnimatedSprite(playerSheet.standSouth);
    player.anchor.set(0.5);
    player.animationSpeed = .2;
    player.loop = false;
    player.x = app.view.width / 2;
    player.y = app.view.height / 2;
    player.width = 50;
    player.height = 50;
    app.stage.addChild(player);
    player.play();
}


//function to load background image
function createBackground() {
    //background image
    Background = PIXI.Sprite.from("./Images/CPBackground.webp");
    Background.anchor.set(0.5);
    Background.x = app.view.width / 2;
    Background.y = app.view.height / 2;
    Background.width = app.view.width;
    Background.height = app.view.height;
    app.stage.addChild(Background)

    //transparent image to stop player from overlapping buildings in background image
    imageblnk = PIXI.Sprite.from("./Images/");
    imageblnk.anchor.set(0.5);
    imageblnk.x = 700;
    imageblnk.y = 200;
    imageblnk.width = 1300;
    imageblnk.height = 160;
    app.stage.addChild(imageblnk)
}




//Function to detect and handle collision events
function handleCollision(object1, object2) {
    const playerBounds = object1.getBounds();
    const treeBounds = object2.getBounds();

    //if players touching
    if (playerBounds.x < treeBounds.x + treeBounds.width &&
        playerBounds.x + playerBounds.width > treeBounds.x &&
        playerBounds.y < treeBounds.y + treeBounds.height &&
        playerBounds.y + playerBounds.height > treeBounds.y) {

        // Calculate the overlap between the player and the tree
        const overlapX = Math.min(playerBounds.x + playerBounds.width, treeBounds.x + treeBounds.width) - Math.max(playerBounds.x, treeBounds.x);
        const overlapY = Math.min(playerBounds.y + playerBounds.height, treeBounds.y + treeBounds.height) - Math.max(playerBounds.y, treeBounds.y);

        // Determine the direction of the collision
        if (overlapX < overlapY) {
            if (playerBounds.x < treeBounds.x) {
                player.x -= overlapX;
            } else {
                player.x += overlapX;
            }
        } else {
            if (playerBounds.y < treeBounds.y) {
                player.y -= overlapY;
            } else {
                player.y += overlapY;
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
function checkBounds() {
    if (player.x > app.view.width) {
        player.x = app.view.width;
    } else if (player.x < 0) {
        player.x = 0;
    }

    if (player.y > app.view.height) {
        player.y = app.view.height;
    } else if (player.y < 0) {
        player.y = 0;
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
    //keysDiv.innerHTML = JSON.stringify(keys);

    //"W" key
    if (keys["87"]) {
        if (!player.playing) {
            player.textures = playerSheet.walkNorth;
            player.play();
        }
        player.y -= speed;
        console.log("X: " + player.x + "\nY:" + player.y);
    }
    //"A" key
    if (keys["65"]) {
        if (!player.playing) {
            player.textures = playerSheet.walkWest;
            player.play();
        }
        player.x -= speed;
        console.log("X: " + player.x + "\nY:" + player.y);
    }
    //"S" key
    if (keys["83"]) {
        if (!player.playing) {
            player.textures = playerSheet.walkSouth;
            player.play();
        }
        player.y += speed;
        console.log("X: " + player.x + "\nY:" + player.y);
    }
    //"D" key
    if (keys["68"]) {
        if (!player.playing) {
            player.textures = playerSheet.walkEast;
            player.play();
        }
        player.x += speed;
        console.log("X: " + player.x + "\nY:" + player.y);
    }



    checkBounds();

    //check if player is following trail to switch scenes
    switchScenes();

    //check for collision
    handleCollision(player, imageblnk)

}



