$(function () {
  let currentLevel = 1;
  let boundaryPlatforms = [];
  let winScreenShown = false;

  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

  function startLevelTwo() {
    currentLevel = 2;
    winScreenShown = false;
    platforms = boundaryPlatforms.map((platform) => ({ ...platform }));
    badPlatforms = [];
    cannons = [];
    projectiles = [];
    collectables = [];

    player.x = 50;
    player.y = 100;
    player.speedX = 0;
    player.speedY = 0;
    player.onGround = false;
    player.facingRight = true;
    player.deadAndDeathAnimationDone = false;
    player.winConditionMet = false;
    currentAnimationType = animationTypes.run;
    frameIndex = 0;
    jumpTimer = 0;
    duckTimer = 0;

    Object.assign(keyPress, {
      any: false,
      up: false,
      left: false,
      down: false,
      right: false,
      space: false,
    });

    createPlatform(150, 630, 110, 20, "#5b8c5a");
    createPlatform(330, 520, 105, 20, "#5b8c5a");
    createPlatform(510, 410, 100, 20, "#5b8c5a");
    createPlatform(700, 310, 110, 20, "#5b8c5a", 680, 800, 1.5);
    createPlatform(900, 405, 100, 20, "#5b8c5a");
    createPlatform(1080, 300, 110, 20, "#5b8c5a");
    createPlatform(1260, 405, 110, 20, "#5b8c5a");

    createBadPlatform(240, 630, 20, 20);
    createBadPlatform(410, 520, 25, 20);
    createBadPlatform(585, 410, 25, 20);
    createBadPlatform(975, 405, 25, 20);
    createBadPlatform(1165, 300, 25, 20);

    createCollectable("coin", 183, 585);
    createCollectable("coin", 365, 475);
    createCollectable("coin", 540, 365);
    createCollectable("coin", 735, 265);
    createCollectable("coin", 930, 360);
    createCollectable("coin", 1115, 255);
    createCollectable("coin", 1295, 360);

    createCannon("top", 300, 950, 30, 30);
    createCannon("top", 700, 1100, 30, 30);
    createCannon("top", 1100, 1300, 30, 30);
    createCannon("right", 470, 1500, 30, 30);
  }

  function showWinScreen() {
    if (!winScreenShown) {
      winScreenShown = true;
      keyPress.any = false;
    }

    ctx.fillStyle = "white";
    ctx.font = "800% comic sans";
    ctx.fillText(
      currentLevel === 1 ? "Level 1 Complete!" : "You Win!",
      canvas.width / 5,
      canvas.height / 6 + canvas.height / 5,
      (canvas.width / 16) * 14
    );
    ctx.font = "500% comic sans";
    ctx.fillText(
      currentLevel === 1
        ? "Hit any key for Level 2"
        : "Hit any key to restart",
      canvas.width / 4,
      canvas.height / 6 + canvas.height / 3,
      (canvas.width / 16) * 14
    );

    if (keyPress.any) {
      keyPress.any = false;
      if (currentLevel === 1) {
        startLevelTwo();
      } else {
        window.location.reload();
      }
    }
  }

  window.winGame = showWinScreen;
  window.deathOfPlayer = function showLoseScreen() {
    ctx.fillStyle = "black";
    ctx.font = "800% serif";
    ctx.fillText(
      "You are dead",
      canvas.width / 4,
      canvas.height / 6 + canvas.height / 5,
      (canvas.width / 16) * 14
    );
    ctx.font = "500% serif";
    ctx.fillText(
      "Hit any key to restart",
      canvas.width / 4,
      canvas.height / 6 + canvas.height / 3,
      (canvas.width / 16) * 14
    );
    if (keyPress.any) {
      keyPress.any = false;
      window.location.reload();
    }
  };

  function setup() {
    if (firstTimeSetup) {
      halleImage = document.getElementById("player");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      //start game
      setInterval(main, 1000 / frameRate);
    }

    // Create walls - do not delete or modify this code
    createPlatform(-50, -50, canvas.width + 100, 50); // top wall
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200, "rgb(102, 102, 102)"); // bottom wall
    createPlatform(-50, -50, 50, canvas.height + 500); // left wall
    createPlatform(canvas.width, -50, 50, canvas.height + 100); // right wall

    //////////////////////////////////
    // ONLY CHANGE BELOW THIS POINT //
    //////////////////////////////////

    boundaryPlatforms = platforms.slice(0, 4);

    // TODO 1 - Enable the Grid
   //toggleGrid();


    // TODO 2 - Create Platforms

    createPlatform(500, 0, 20, 350);
    createPlatform(500, 650, 90, 20,);
    createPlatform(700, 550, 90, 20,);
    createPlatform(500, 450, 90, 20,);
    createPlatform(500, 350, 80, 20);
    createPlatform(500, 250, 79, 20);
    createPlatform(880, 250, 90, 20, "grey", 700, 900, 2, 200, 500, 0)
    createPlatform(1200, 650, 79, 20);
    createPlatform(1000, 550, 79, 20);
    createBadPlatform(850, 550, 79, 20);

    // TODO 3 - Create Collectables

    createCollectable("coin", 550,200, 0.5, 0.37);
    createCollectable("coin", 880, 200, 0, 1, 700, 900, 2);
    createCollectable("coin", 1200, 170, 0.5, 0.37);
    createCollectable("coin",520,570, 0.5, 0.37);
    createCollectable("coin",150,570, 0.5, 0.37);
    
    // TODO 4 - Create Cannons

createCannon("top", 180, 900);
createCannon("right", 300, 2000);
createCannon("right", 400, 2000);
createCannon("top", 1100, 1500);
createCannon("top", 280, 1000);
createCannon("top", 380, 1100);
    
    
    //////////////////////////////////
    // ONLY CHANGE ABOVE THIS POINT //
    //////////////////////////////////
  }

  registerSetup(setup);
});
