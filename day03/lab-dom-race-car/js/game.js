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
    this.lives = 1;
    this.gameIsOver = false;
    this.gameIntervalId = null;
    this.gameLoopFrequency = Math.round(1000 / 60);
    //this is for adding an obstacle every couple seconds
    this.counter = 1;
    //this is the sound section
    this.honk = new Audio("../sounds/honk.wav");
    this.honk.volume = 0.1;
    //this is an example name
    this.playerName = "Ragnar";
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
        //this is where we play the honk when there is a collision
        this.honk.play();
      }

      //this is handling the score if the red car passes
      if (oneObstacle.top > 600) {
        //remove red car from the array
        this.obstacles.splice(i, 1);
        //move the for loop back one iteration bc we removed an element from the array
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
      //this is where I am adding values to the local storage for high scores
      //this is to check first if there are any high scores already in the local storage
      let highScoresFromLS = JSON.parse(localStorage.getItem("highscores"));
      if (highScoresFromLS) {
        const newHighScore = { name: this.playerName, score: this.score };
        //this adds our score to the new array created by JSON.parse
        highScoresFromLS.push(newHighScore);
        //after you add your newest score, then you can sort the array highest to lowest
        highScoresFromLS.sort((a, b) => {
          if (a.score < b.score) {
            return 1;
          } else if (a.score > b.score) {
            return -1;
          } else {
            return 0;
          }
        });
        //slice out the first 3 elements, if they were highest to lowest then you have your top three scores
        highScoresFromLS = highScoresFromLS.slice(0, 3);
        console.log("here are the scores from the ls,", highScoresFromLS);
        localStorage.setItem("highscores", JSON.stringify(highScoresFromLS));
      } else {
        //else is if there were no scores already, so we create the key highscores and add our score
        //the set Item method needs two arguments, one is the name and the other is the value
        const newHighScores = [{ name: this.playerName, score: this.score }];
        localStorage.setItem("highscores", JSON.stringify(newHighScores));
      }
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
