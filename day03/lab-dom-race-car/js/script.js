window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  //make a new game instance
  let myGame = new Game();
  startButton.addEventListener("click", function () {
    startGame();
  });
  restartButton.addEventListener("click", () => {
    // location.reload();
    myGame = new Game();
    startGame();
  });
  //this is for keyboard events, when you press a key
  document.addEventListener("keydown", (event) => {
    event.preventDefault();
    if (event.code === "ArrowUp") {
      //change the directionY of the player to -1
      myGame.player.directionY = -3;
    } else if (event.code === "ArrowDown") {
      //change the directionY of the player to 3
      myGame.player.directionY = 3;
    } else if (event.code === "ArrowRight") {
      //change the directionX of the player to 3
      myGame.player.directionX = 3;
    } else if (event.code === "ArrowLeft") {
      //change the directionX of the player to -3
      myGame.player.directionX = -3;
    }
  });
  document.addEventListener("keyup", () => {
    myGame.player.directionY = 0;
    myGame.player.directionX = 0;
  });
  function startGame() {
    console.log("start game");
    myGame.start();
  }
};
