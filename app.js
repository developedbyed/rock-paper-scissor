const game = () => {
  let pScore = 0;
  let cScore = 0;

  //Start the Game
  const startGame = () => {
    const playBtn = document.querySelector(".intro button");
    const introScreen = document.querySelector(".intro");
    const match = document.querySelector(".match");

    playBtn.addEventListener("click", () => {
      introScreen.classList.add("fadeOut");
      match.classList.add("fadeIn");
    });
  };
  //Play Match
  const playMatch = () => {
    const options = document.querySelectorAll(".options button");
    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");
    const hands = document.querySelectorAll(".hands img");
    //Update Text
    const winner = document.querySelector(".winner");

    hands.forEach((hand) => {
      hand.addEventListener("animationend", function () {
        this.style.animation = "";
      });
    });
    //Computer Options
    const computerOptions = ["rock", "paper", "scissors"];

    options.forEach((option) => {
      option.addEventListener("click", function () {
        //Computer Choice
        const computerNumber = Math.floor(Math.random() * 3);
        const computerChoice = computerOptions[computerNumber];

        setTimeout(() => {
          //Here is where we call compare hands
          compareHands(this.textContent, computerChoice, winner);
          //Update Images
          playerHand.src = `./assets/${this.textContent}.png`;
          computerHand.src = `./assets/${computerChoice}.png`;

          // updating the score
          updateScore();
        }, 2000);
        //Animation
        winner.textContent = "Let's See...";
        playerHand.style.animation = "shakePlayer 2s ease";
        computerHand.style.animation = "shakeComputer 2s ease";
      });
    });
  };

  const updateScore = () => {
    const playerScore = document.querySelector(".player-score p");
    const computerScore = document.querySelector(".computer-score p");
    playerScore.textContent = pScore;
    computerScore.textContent = cScore;

    if (pScore === 5 || cScore === 5) {
      endGame();
    }
  };

  const compareHands = (playerChoice, computerChoice, winner) => {
    //Checking for a tie
    if (playerChoice === computerChoice) {
      winner.textContent = "It is a tie";
      return;
    }
    //Check for Rock
    if (playerChoice === "rock") {
      if (computerChoice === "scissors") {
        winner.textContent = "Player Wins";
        pScore++;
        return;
      } else {
        winner.textContent = "Computer Wins";
        cScore++;
        return;
      }
    }
    //Check for Paper
    if (playerChoice === "paper") {
      if (computerChoice === "scissors") {
        winner.textContent = "Computer Wins";
        cScore++;
        return;
      } else {
        winner.textContent = "Player Wins";
        pScore++;
        return;
      }
    }
    //Check for Scissors
    if (playerChoice === "scissors") {
      if (computerChoice === "rock") {
        winner.textContent = "Computer Wins";
        cScore++;
        return;
      } else {
        winner.textContent = "Player Wins";
        pScore++;
        return;
      }
    }
  };

  // END Screen
  const endGame = () => {
    const endScreen = document.querySelector(".end");
    const startOver = document.querySelector(".end button");
    const endMessage = document.querySelector(".end h1");
    const matchScreen = document.querySelector(".match");
    const textMessage = document.querySelector(".winner");

    if (pScore > cScore) {
      endMessage.textContent = "Player Wins!!!";
    } else if (pScore < cScore) {
      endMessage.textContent = "Computer Wins :(";
    } else {
      endMessage.textContent = "Its a Tie !!!";
    }
    matchScreen.classList.remove("fadeIn");
    endScreen.classList.add("fadeIn");

    startOver.addEventListener("click", () => {
      resetGame();
      matchScreen.classList.add("fadeIn");
      endScreen.classList.remove("fadeIn");
      textMessage.textContent = "Choose an option";
    });
  };

  // reset Game
  const resetGame = () => {
    pScore = 0;
    cScore = 0;
    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");
    playerHand.src = `./assets/rock.png`;
    computerHand.src = `./assets/rock.png`;
    updateScore();
  };

  //Is call all the inner function
  startGame();
  playMatch();
};

//start the game function
game();
