

let app;
let player;
let Background;
let tree;
let keys = {};
let keysDiv;
let speed = 3;
let playerSheet = {};

window.onload = function() {

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

    app.loader.add("background", "./Images/ClubBackground.png");
    app.loader.add("penguin", "./Images/character.png");
    app.loader.load(doneLoading);

    

    //Event Handlers
    window.addEventListener("keydown", keysDown);
    window.addEventListener("keyup", keysUp);

    keysDiv = document.querySelector("#keys")
}

function doneLoading(e){
    createBackground();
    createPlayerSheet();
    createPlayer();
    app.ticker.add(gameLoop);
}

function createPlayerSheet(){
    let ssheet = new PIXI.BaseTexture.from(app.loader.resources["penguin"].url);
    let w = 17;
    let h = 20;

    //Setting Player Standing Directional Sprites
    playerSheet["standSouth"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(0*w, 0, w, h))
    ];
    playerSheet["standWest"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(6*w, 0, w, h))
    ];
    playerSheet["standEast"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(9*w, 0, w, h))
    ];
    playerSheet["standNorth"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(1*w, 0, w, h))];

    playerSheet["walkSouth"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(2 * w, 0, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(3 * w, 0, w, h))
    ];
    playerSheet["walkWest"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(6 * w, 0, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(7 * w, 0, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(8 * w, 0, w, h))
    ];
    playerSheet["walkEast"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(9 * w, 0, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(10 * w, 0, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(11 * w, 0, w, h))
    ];
    playerSheet["walkNorth"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(4 * w, 0, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(5 * w, 0, w, h))
    ];

}

function createPlayer(){
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

function createBackground(){
    Background = PIXI.Sprite.from("./Images/ClubBackground.png");
    Background.anchor.set(0.5);
    Background.x = app.view.width / 2;
    Background.y = app.view.height / 2;
    Background.width = app.view.width;
    Background.height = app.view.height;
    app.stage.addChild(Background)
}

//functions attached to event listener to detect key presses
function keysDown(e){
    keys[e.keyCode] = true;
}
function keysUp(e){
    keys[e.keyCode] = false;
}

//Function to detect and handle collision eventts
/*function handleCollision(object1, object2)
    {
        const playerBounds = player.getBounds();
        const treeBounds = tree.getBounds();
        
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
*/
    

    //Function that loops every frame
function gameLoop(){
    //keysDiv.innerHTML = JSON.stringify(keys);

    //"W" key
    if(keys["87"]){
        if(!player.playing){
            player.textures = playerSheet.walkNorth;
            player.play();
        }
        player.y -= speed;
    }
    //"A" key
    if(keys["65"]){
        if(!player.playing){
            player.textures = playerSheet.walkWest;
            player.play();
        }
        player.x -= speed;
    }
    //"S" key
    if(keys["83"]){
        if(!player.playing){
            player.textures = playerSheet.walkSouth;
            player.play();
        }
        player.y += speed;
    }
    //"D" key
    if(keys["68"]){
        if(!player.playing){
            player.textures = playerSheet.walkEast;
            player.play();
        }
        player.x += speed;
    }

    //check for collision
   // handleCollision(player, tree)

}



