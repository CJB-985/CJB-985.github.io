$(function () {
  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

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

    // TODO 1 - Enable the Grid
   toggleGrid();


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
6

    // TODO 3 - Create Collectables

    createCollectable("coin", 450, 170, 0.5, 0.37);
    createCollectable("coin", 880, 200, 0, 1, 700, 900, 2);
    createCollectable("coin", 1200, 170, 0.5, 0.37);
    createCollectable("coin",520,570, 0.5, 0.37);
    
    // TODO 4 - Create Cannons

createCannon("top", 200, 900);
createCannon("right", 300, 2000);
createCannon("right", 400, 2000);
createCannon("top", 1100, 900);
    
    
    //////////////////////////////////
    // ONLY CHANGE ABOVE THIS POINT //
    //////////////////////////////////
  }

  registerSetup(setup);
});
