class Game {
  constructor() {
    this.startScreen = document.querySelector("#game-intro");
    this.gameScreen = document.querySelector("#game-screen");
    this.gameEndScreen = document.querySelector("#game-end");
    this.scoreElement = document.querySelector("#score");
    this.livesElement = document.querySelector("#lives");
    this.player = new Player(
      this.gameScreen,
      200,
      370,
      125,
      250,
      "../images/car.png"
    );
    this.height = 600;
    this.width = 500;
    this.obstacles = [new Obstacle(this.gameScreen)];
    this.score = 0;
    this.lives = 3;
    this.gameIsOver = false;
    this.gameIntervalId = null;
    this.gameLoopFrequency = Math.round(1000 / 60);
    //this is for adding an obstacle every couple seconds
    this.counter = 1;
  }
  start() {
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    //this will be called 60 times per second
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
      //this updates the counter to add an obstacle
      this.counter++;
      if (this.counter % 200 === 0) {
        this.obstacles.push(new Obstacle(this.gameScreen));
      }
    }, this.gameLoopFrequency);
  }
  gameLoop() {
    this.update();

    //this is to move the obstacles, they are in an array so remember to need to loop over it
    for (let i = 0; i < this.obstacles.length; i++) {
      const oneObstacle = this.obstacles[i];
      oneObstacle.move();

      // this will handle the collision of the obstacle and our car
      if (this.player.didCollide(oneObstacle)) {
        console.log("oh no, you hit the car");
        this.obstacles.splice(i, 1);
        i--;
        //removes the image from the page
        oneObstacle.element.remove();

        //decrease the lives by one
        this.lives--;
        //this updates the DOM for the lives element
        this.livesElement.innerText = this.lives;
        //if the lives equal 0 then the game is over and you need stop everything and show the game over screen
        if (this.lives === 0) {
          this.endGame();
        }
      }

      //this is handling the score if the red car passes
      if (oneObstacle.top > 600) {
        this.obstacles.splice(i, 1);
        i--;
        this.score++;
        //removes the image from the page
        oneObstacle.element.remove();
        //this is to update the DOM to the new score
        this.scoreElement.innerText = this.score;
      }
    }

    //this is if the game is over
    if (this.gameIsOver) {
      //If the game is over is true, then we stop the game by clearing the interval
      clearInterval(this.gameIntervalId);
    }
  }
  update() {
    this.player.move();
  }

  endGame() {
    console.log("the game is over");
    this.gameIsOver = true;
    //remove player from the DOM
    this.player.element.remove();
    //loop through obstacles array and remove each one
    this.obstacles.forEach((obs) => {
      obs.element.remove();
    });

    //hide the game Screen and show the game over screen
    this.gameScreen.style.display = "none";
    this.gameEndScreen.style.display = "block";
  }
}
