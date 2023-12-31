let app;
let player;
let playerSheet = {};
let obstacles = [];
let keys = {};
let keysDiv;
let speed = 2;
let gravity = .2;
let jumpHeight = 0;
let isJumping = false;
let numBackgrounds = 50;
let elapsedTime = 0;
let score = 0;
const speedIncreaseInterval = 5000; // Increase speed every 5 seconds

const snowmanTexture = PIXI.Texture.from("snowman.png");
const backgroundTexture = PIXI.Texture.from("background.png");

window.onload = function () {
    createStartButton();
    window.addEventListener("keydown", keysDown);
    window.addEventListener("keyup", keysUp);

};

function createStartButton() {
    const startButton = document.createElement("button");
    startButton.textContent = "Start Game";
    startButton.addEventListener("click", startGame);
    document.body.appendChild(startButton);
}

function startGame() {
    const startButton = document.querySelector("button");
    if (startButton) {
        startButton.remove();
    }

    app = new PIXI.Application({
        resizeTo: window,
        transparent: true,
        autoDensity: true,
        resolution: devicePixelRatio,
    });

    document.body.appendChild(app.view);

    app.loader.add("penguin", "penguin-sheet2.png");

    createBackground();
    createPlayerSheet();
    createPlayer();
    createScoreCounter(); // Create the live score counter

    keysDiv = document.querySelector("#keys");

    app.ticker.add(gameLoop);
}

function keysDown(e) {
    keys[e.keyCode] = true;
}

function keysUp(e) {
    keys[e.keyCode] = false;
}

function createBackground() {
    const backgroundContainer = new PIXI.Container();
    app.stage.addChild(backgroundContainer);

    for (let i = 0; i < numBackgrounds; i++) {
        const background = new PIXI.Sprite(backgroundTexture);
        background.width = app.view.width;
        background.height = app.view.height;
        background.x = i * app.view.width;
        backgroundContainer.addChild(background);
    }
}

function createPlayerSheet() {
    const frames = {
        "24": { "frame": { "x": 383, "y": 5, "w": 49, "h": 94 } },
        "25": { "frame": { "x": 441, "y": 5, "w": 49, "h": 94 } },
        "26": { "frame": { "x": 499, "y": 5, "w": 49, "h": 94 } },
    };

    let ssheet = new PIXI.BaseTexture.from(app.loader.resources["penguin"].url);

    playerSheet["walkEast"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(frames["24"].frame.x, frames["24"].frame.y, frames["24"].frame.w, frames["24"].frame.h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(frames["26"].frame.x, frames["26"].frame.y, frames["26"].frame.w, frames["26"].frame.h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(frames["25"].frame.x, frames["25"].frame.y, frames["25"].frame.w, frames["25"].frame.h)),
    ];

}

function createPlayer() {
    player = new PIXI.AnimatedSprite(playerSheet.walkEast);
    player.anchor.set(0.5);
    player.animationSpeed = .2;
    player.loop = true;
    player.x = app.view.width / 2;
    player.y = app.view.height / 1.3;
    player.width = 75;
    player.height = 75;
    app.stage.addChild(player);
    player.play();
}

function createScoreCounter() {
    // Create a div element for the live score counter
    const scoreCounter = document.createElement("div");
    scoreCounter.id = "score-counter";
    document.body.appendChild(scoreCounter);

    // Score position
    scoreCounter.style.position = "absolute";
    scoreCounter.style.top = "20px";
    scoreCounter.style.left = "50%";
    scoreCounter.style.transform = "translateX(-50%)";
}

function updateScoreCounter() {
    // Update the live score counter
    const scoreCounter = document.getElementById("score-counter");
    if (scoreCounter) {
        scoreCounter.textContent = `Score: ${score}`;
    }
}

function handlePlayerMovement() {
    if (keys[87] && !isJumping) {
        isJumping = true;
        jumpHeight = 13;
    }

    // Gravity
    if (isJumping) {
        player.y -= jumpHeight;
        jumpHeight -= gravity;

        if (player.y >= app.view.height / 1.3) {
            player.y = app.view.height / 1.3;
            isJumping = false;
        }
    }
}

function generateObstacle() {
    const obstacleSpacing = 300;

    // Check if there are no obstacles or if the last obstacle is far enough
    if (obstacles.length === 0 || obstacles[obstacles.length - 1].x < app.view.width - obstacleSpacing) {
        const obstacle = PIXI.Sprite.from(snowmanTexture);
        obstacle.anchor.set(0.5, 1);
        obstacle.x = app.view.width + Math.random() * obstacleSpacing;
        obstacle.y = app.view.height / 1.2;
        obstacle.width = 100;
        obstacle.height = 100;
        app.stage.addChild(obstacle);
        obstacles.push(obstacle);
    }
}

function updateObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].x -= speed;

        if (collision(player, obstacles[i])) {
            endGame();
        }

        if (obstacles[i].x + obstacles[i].width < 0) {
            app.stage.removeChild(obstacles[i]);
            obstacles.splice(i, 1);
            i--;
        }
    }

    //obstacle generation probability based on the speed
    if (Math.random() < speed / 200) {
        generateObstacle();
    }
}

function collision(player, obstacle) {
    return (
        player.x < obstacle.x + obstacle.width &&
        player.x + player.width > obstacle.x &&
        player.y < obstacle.y + obstacle.height &&
        player.y + player.height > obstacle.y
    );
}

function increaseDifficulty() {
    elapsedTime += app.ticker.elapsedMS; // Increase elapsed time

    // Increase speed every 5 seconds
    if (elapsedTime >= speedIncreaseInterval) {
        speed += 0.5;
        elapsedTime = 0; // Reset the timer
    }
}

function updateScore() {
    // Increase the score every frame
    score++;
}

function endGame() {
    const finalScore = score;

    const gameOverPopup = document.createElement("div");
    gameOverPopup.className = "game-over-popup";
    gameOverPopup.innerHTML = `<p>Game Over! Your score: ${finalScore}</p><button onclick="restartGame()">Restart</button>`;
    document.body.appendChild(gameOverPopup);

    app.destroy();
}

function restartGame() {
    // Reload the entire page for now this is method used to create new game.
    location.reload();
}

function gameLoop() {

    handlePlayerMovement();
    updateObstacles();
    increaseDifficulty();
    updateScore();
    updateScoreCounter(); // Update the live score counter
    keysDiv.innerHTML = "";

    if (app.stage && app.stage.children) {
        const backgroundContainer = app.stage.children[0];

        if (backgroundContainer && backgroundContainer.children) {
            for (let i = 0; i < backgroundContainer.children.length; i++) {
                const background = backgroundContainer.children[i];

                // Check if background exists
                if (background) {
                    background.x -= speed;

                    // Reposition the background when it goes off the screen
                    if (background.x + background.width <= 0) {
                        // Find the rightmost background and reposition it after the last one
                        let rightmostX = 0;
                        for (let j = 0; j < backgroundContainer.children.length; j++) {
                            const bg = backgroundContainer.children[j];
                            if (bg.x > rightmostX) {
                                rightmostX = bg.x;
                            }
                        }
                        background.x = rightmostX + background.width;
                    }
                }
            }
        }
    }
}