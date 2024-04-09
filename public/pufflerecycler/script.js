puffleTextures = [];
puffles = [];
speed = 2;
score = 0;
lives = 3;
badClickScore = -10; // Score decrement for clicking on a "bad" puffle
goodClickScore = 25; // Score increment for clicking on a "good" puffle
backgroundTexture = PIXI.Texture.from("/pufflerecycler/images/background.png");

function startScript() {
  game = document.getElementById("game");
  game.style.filter = "blur(5px)";

  app = new PIXI.Application({
    resizeTo: window,
    padding: 0,
    margin: 0,
  });
  document.getElementById("game").appendChild(app.view);

  // Load textures
  for (let i = 1; i <= 3; i++) {
    const texture = PIXI.Texture.from(`/pufflerecycler/images/good-${i}.svg`);
    texture.isBadPuffle = false; // Add custom property for good puffle
    puffleTextures.push(texture);
  }
  for (let i = 1; i <= 8; i++) {
    const texture = PIXI.Texture.from(`/pufflerecycler/images/bad-${i}.svg`);
    texture.isBadPuffle = true; // Add custom property for bad puffle
    puffleTextures.push(texture);
  }

  createStartButton();
  createBackground();
}

function createStartButton() {
  const prompt = document.getElementById("boxInside");
  if ("button" in prompt.childNodes) {
    document.getElementById("boxInside").style.display = "flex";
  } else {
    startButton = document.createElement("button");
    startButton.textContent = "Start Game";
    startButton.addEventListener("click", startGame);

    // Workaround to set !important
    startButton.setAttribute("style", "width:100% !important");

    document.getElementById("boxInside").appendChild(startButton);
  }
}

function startGame() {
  const prompt = document.getElementById("boxInside");
  const game = document.getElementById("game");

  game.style.filter = "blur(0)";

  if (prompt) {
    prompt.style.display = "none";
  }

  createScoreCounter(); // Create the live score counter

  keysDiv = document.querySelector("#game");

  // Start game loop
  app.ticker.add(gameLoop);

  // Register canvas mouse click event and keyboard events
  app.view.addEventListener("click", mouseClick);
}

function mouseClick(event) {
  const mousePosition = app.renderer.plugins.interaction.mouse.global;
  let clickedPuffleIndex = -1;

  for (let i = 0; i < puffles.length; i++) {
    const puffle = puffles[i];
    if (puffle.getBounds().contains(mousePosition.x, mousePosition.y)) {
      clickedPuffleIndex = i;
      if (puffle.texture.isBadPuffle) {
        // Good puffle clicked
        score += goodClickScore;
      } else {
        // Bad puffle clicked
        score += badClickScore;
      }
      break; // Exit loop after catching one puffle
    }
  }

  // Remove the clicked puffle
  if (clickedPuffleIndex !== -1) {
    app.stage.removeChild(puffles[clickedPuffleIndex]);
    puffles.splice(clickedPuffleIndex, 1);
  }

  // Update score counter
  updateScoreCounter();
}

function createBackground() {
  const background = new PIXI.Sprite(backgroundTexture);
  background.width = app.view.width;
  background.height = app.view.height;
  app.stage.addChild(background);
}

function createScoreCounter() {
  // Create PIXI text for score and lives
  scoreCounter = new PIXI.Text(`Score: ${score}\nLives: ${lives}`, {
    fontFamily: "ABeeZee",
    fontSize: 24,
    fill: 0x51504f,
  });

  // Anchor in top right corner
  scoreCounter.anchor.set(1, 0);
  scoreCounter.position.set(app.view.width - 20, 20);
  app.stage.addChild(scoreCounter);
}

function updateScoreCounter() {
  // Update PIXI text
  scoreCounter.text = `Score: ${score}\nLives: ${lives}`;
}

function generatePuffle() {
  const spawnRegion = {
    x: app.view.width * 0.25, // Left boundary of the spawn region
    y: 1, // Bottom boundary of the spawn region
    width: app.view.width * 0.5, // Width of the spawn region
    height: app.view.height * 0.25, // Height of the spawn region
  };
  const puffleSize = 100;
  const puffle = new PIXI.Sprite(puffleTextures[Math.floor(Math.random() * puffleTextures.length)]);

  puffle.width = puffleSize;
  puffle.height = puffleSize;
  puffle.anchor.set(0.5);
  puffle.x = spawnRegion.x + Math.random() * spawnRegion.width;
  puffle.y = spawnRegion.y - Math.random() * spawnRegion.height;
  app.stage.addChild(puffle);
  puffles.push(puffle);
}

function updatePuffles() {
  for (let i = 0; i < puffles.length; i++) {
    const puffle = puffles[i];
    puffle.y += speed;
    if (puffle.y > app.view.height + 50) {
      // If puffle goes below the screen
      app.stage.removeChild(puffle);
      puffles.splice(i, 1);
      i--; // Update index as array length changes
      if (puffle.texture.isBadPuffle) {
        // Decrement lives if it's a bad puffle
        lives--;
        if (lives === 0) {
          // If no lives left, end the game
          endGame();
        }
      }
    }
  }
}

function handlePufflesFallingOffScreen() {
  let badPufflesFallen = 0;
  for (let i = 0; i < puffles.length; i++) {
    if (puffles[i].y > app.view.height + 50 && puffles[i].texture.textureCacheIds[0].includes("bad")) {
      // If a "bad" puffle goes below the screen
      badPufflesFallen++;
      if (badPufflesFallen === 3) {
        // If 3 "bad" puffles have fallen, decrement lives and end the game if no lives left
        lives--;
        if (lives === 0) {
          endGame();
        }
      }
    }
  }
}

async function submitScore() {
  if (score == 0) {
    return;
  }

  const response = await fetch("/api/write/score", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ score: score, gameName: "pufflerecycler" }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error("Failed to upload score", errorData);
  }
}

function endGame() {
  submitScore(score);

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
  gameOverPopup.style.backgroundColor = "var(--transparent-grey)";
  gameOverPopup.style.width = "80dvh";

  // Display contents
  gameOverH1 = document.createElement("h1");
  gameOverH1.textContent = "Game Over!";

  gameOverA = document.createElement("a");
  gameOverA.textContent = `Your score ${score}`;

  gameOverDiv = document.createElement("div");
  gameOverDiv.style.display = "flex";
  gameOverDiv.style.alignItems = "center";
  gameOverDiv.style.justifyContent = "space-between";
  gameOverDiv.style.width = "100%";

  gameOverButton = document.createElement("button");
  gameOverButton.setAttribute("style", "width:100% !important");
  gameOverButton.textContent = "Restart Game";
  gameOverButton.addEventListener("click", restartGame);

  goHomeButton = document.createElement("button");
  goHomeButton.setAttribute("style", "width:100% !important");
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
  location.replace("/");
}

function gameLoop() {
  // Create new puffle occasionally
  if (Math.random() < 0.02) {
    generatePuffle();
  }

  // Update existing puffles
  updatePuffles();

  // Update score
  updateScoreCounter();

  handlePufflesFallingOffScreen();
}
