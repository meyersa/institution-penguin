playerSheet = {};
obstacles = [];
keys = {};
speed = 2;
gravity = .2;
jumpHeight = 0;
isJumping = false;
numBackgrounds = 50;
elapsedTime = 0;
score = 0;
speedIncreaseInterval = 5000; // Increase speed every 5 seconds

snowmanTexture = PIXI.Texture.from("/flappypenguin/images/snowman.png");
backgroundTexture = PIXI.Texture.from("/flappypenguin/images/background.png");

function startScript() {
    game = document.getElementById("game")
    game.style.filter = "blur(5px)"

    app = new PIXI.Application({
        resizeTo: window,
        padding: 0,
        margin: 0,

    });
    document.getElementById("game").appendChild(app.view);

    createStartButton();
    createBackground();

};

function createStartButton() {
    const prompt = document.getElementById("boxInside")
    if ("button" in prompt.childNodes) {
        document.getElementById("boxInside").style.display = 'flex'

    } else {
        startButton = document.createElement("button");
        startButton.textContent = "Start Game";
        startButton.addEventListener("click", startGame);

        // Workaround to set !important 
        startButton.setAttribute('style', 'width:100% !important');

        document.getElementById("boxInside").appendChild(startButton);

    };
};

function startGame() {
    const prompt = document.getElementById("boxInside");
    const game = document.getElementById("game");

    game.style.filter = "blur(0)";

    if (prompt) {
        prompt.style.display = 'none';

    }

    app.loader.add("penguin", "/flappypenguin/images/penguin-sheet2.png");

    createPlayerSheet();
    createPlayer();
    createScoreCounter(); // Create the live score counter

    keysDiv = document.querySelector("#game");

    // Start game loop
    app.ticker.add(gameLoop);

    // Start countdown
    app.ticker.start()

    // Register canvas mouse click event and keyboard events
    app.view.addEventListener("click", mouseClick);
    window.addEventListener("keydown", keysDown);
    window.addEventListener("keyup", keysUp);

};

function keysDown(e) {
    keys[e.keyCode] = true;

};

function keysUp(e) {
    keys[e.keyCode] = false;

};

function mouseClick() {
    keys["mouse"] = 1

};

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
    // Create PIXI text
    scoreCounter = new PIXI.Text('Score: 0', { fontFamily: 'ABeeZee', fontSize: 24, fill: 0x51504f });

    // Anchor in top right corner
    scoreCounter.anchor.set(1, 0);
    scoreCounter.position.set(app.view.width - 20, 20);
    app.stage.addChild(scoreCounter);

}

function updateScoreCounter() {
    // Update PIXI text
    scoreCounter.text = `Score: ${score}`;

}

function handlePlayerMovement() {
    // Gravity
    if (isJumping) {
        player.y -= jumpHeight;
        jumpHeight -= gravity;

        if (player.y >= app.view.height / 1.3) {
            player.y = app.view.height / 1.3;
            isJumping = false;

        }
        // Exit since jumping already
        return

    }

    // W click jump
    if (keys[87]) {
        isJumping = true;
        jumpHeight = 13;
        return

    }

    // Mouse click jump
    if (keys["mouse"] == 1) {
        keys["mouse"] = 0;
        isJumping = true;
        jumpHeight = 13;
        return

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
    if (app.ticker != null) {
        elapsedTime += app.ticker.elapsedMS; // Increase elapsed time

    } else {
        // Return since game is destroyed
        return

    }

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

async function submitScore() {
    const response = await fetch("/api/write/score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ score: score, gameName: "flappypenguin" })
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error("Failed to upload score", errorData);
    }
}

function endGame() {
    submitScore(score)

    // Blur game
    game = document.getElementById("game");
    game.style.filter = "blur(5px)";

    // Display popup
    gameOverPopup = document.createElement("div");
    gameOverPopup.id = "boxInside";
    gameOverPopup.margin = 0;
    gameOverPopup.style.position = "absolute";
    gameOverPopup.style.top = "40%";
    gameOverPopup.style.left = "50%";
    gameOverPopup.style.transform = "translate(-50%, -50%)";
    gameOverPopup.style.zIndex = "1";
    gameOverPopup.style.backgroundColor = "unset";
    gameOverPopup.style.width = "80dvh";

    // Display contents
    gameOverH1 = document.createElement("h1");
    gameOverH1.textContent = "Game Over!";

    gameOverA = document.createElement("a");
    gameOverA.textContent = `Your score ${score}`;
    gameOverA.style.color = 'var(--dark-grey)';

    gameOverDiv = document.createElement("div"); 
    gameOverDiv.style.display = "flex"; 
    gameOverDiv.style.alignItems = "center"; 
    gameOverDiv.style.justifyContent = "space-between";
    gameOverDiv.style.width = "100%";

    gameOverButton = document.createElement("button");
    gameOverButton.setAttribute('style', 'width:100% !important');
    gameOverButton.textContent = "Restart Game";
    gameOverButton.addEventListener("click", restartGame);

    goHomeButton = document.createElement("button");
    goHomeButton.setAttribute('style', 'width:100% !important');
    goHomeButton.textContent = "Go to Lobby";
    goHomeButton.addEventListener("click", goHome);

    gameButtonRow = document.createElement("div"); 
    gameButtonRow.style.display = "flex"; 
    gameButtonRow.style.alignItems = "center"; 
    gameButtonRow.style.justifyContent = "space-between";
    gameButtonRow.style.gap = "1rem"; 
    gameButtonRow.style.width = "100%";

    gameOverDiv.appendChild(gameOverH1);
    gameOverDiv.appendChild(gameOverA);

    gameButtonRow.appendChild(gameOverButton);
    gameButtonRow.appendChild(goHomeButton);

    gameOverPopup.appendChild(gameOverDiv);
    gameOverPopup.appendChild(gameButtonRow);


    document.body.appendChild(gameOverPopup);
    app.destroy();

}

function restartGame() {
    // Reload the entire page for now this is method used to create new game.
    location.reload();

}

function goHome() { 
    location.replace('/');

}

function gameLoop() {
    handlePlayerMovement();
    updateObstacles();
    increaseDifficulty();
    updateScore();
    updateScoreCounter(); // Update the live score counter

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