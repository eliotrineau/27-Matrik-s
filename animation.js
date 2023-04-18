/*import anime from 'animejs'*/
const boutonPFC = document.querySelector("#btnPFC");
const resultatPFCG = document.querySelector(".resultatPFCG");
const resultatPFCD = document.querySelector(".resultatPFCD");
const calcul = document.querySelector(".calcul");

// Définir les choix possibles pour le jeu PINTE-FUT-COKTAIL
const choixPFC = ["🍺", "🛢", "🍸"];

// Fonction pour jouer une partie de PINTE-FUT-COKTAIL
function jeuPFC() {
  // Générer un choix aléatoire pour chaque joueur
  const joueurGauche = choixPFC[Math.floor(Math.random() * 3)];
  const joueurDroite = choixPFC[Math.floor(Math.random() * 3)];
  
  // Afficher les choix des joueurs
  resultatPFCG.innerHTML = `${joueurGauche}`;
  resultatPFCD.innerHTML = `${joueurDroite}`;
  // Déterminer le gagnant
  if (joueurGauche == joueurDroite) {
    calcul.innerHTML = "<br><br>Les deux joueurs boivent !";
  } else if (
    (joueurGauche == "🍺" && joueurDroite == "🍸") ||
    (joueurGauche == "🛢" && joueurDroite == "🍺") ||
    (joueurGauche == "🍸" && joueurDroite == "🛢")
  ) {
    calcul.innerHTML = "<br><br> Le joueur de droite boit !";
  } else {
    calcul.innerHTML = "<br><br> Le joueur de gauche boit !";
  }
}
console.log(boutonPFC);

// Ajouter un écouteur d'événement au bouton pour jouer une partie de PINTE-FUT-COKTAIL lorsque le bouton est cliqué
boutonPFC.addEventListener("click", jeuPFC);



const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const ballRadius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

const paddleHeight = 80;
const paddleWidth = 10;
let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
let rightPaddleY = canvas.height / 2 - paddleHeight / 2;

let leftPlayerScore = 0;
let rightPlayerScore = 0;

let gameStarted = false;

function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#00FF41";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle(x, y) {
  ctx.beginPath();
  ctx.rect(x, y, paddleWidth, paddleHeight);
  ctx.fillStyle = "#008F11";
  ctx.fill();
  ctx.closePath();
}

function drawScore() {
  ctx.font = "32px Arial";
  ctx.fillStyle = "#008F11";
  ctx.fillText(leftPlayerScore, 100, 50);
  ctx.fillText(rightPlayerScore, canvas.width - 100, 50);
}

function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -ballSpeedX;
  ballSpeedY = Math.random() * 10 - 5;
}

function collisionDetection() {
  // Vérifier si la balle touche le mur du haut ou du bas
  if(ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  // Vérifier si la balle touche la raquette gauche
  if(ballX - ballRadius < paddleWidth &&
      ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
    ballSpeedX = -ballSpeedX;
  }

  // Vérifier si la balle touche la raquette droite
  if(ballX + ballRadius > canvas.width - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
    ballSpeedX = -ballSpeedX;
  }

  // Vérifier si la balle est sortie du terrain à gauche
  if(ballX - ballRadius < 0) {
    rightPlayerScore++;
    resetBall();
  }

  // Vérifier si la balle est sortie du terrain à droite
  if(ballX + ballRadius > canvas.width) {
    leftPlayerScore++;
    resetBall();
  }
}

function draw() {
    // Effacer le canevas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Mettre à jour la position des raquettes en fonction des touches de mouvement pressées
    if(leftPaddleUpPressed) {
      leftPaddleY -= 5;
    }
    if(leftPaddleDownPressed) {
      leftPaddleY += 5;
    }
    if(rightPaddleUpPressed) {
      rightPaddleY -= 5;
    }
    if(rightPaddleDownPressed) {
      rightPaddleY += 5;
    }
    // Vérifier si les raquettes sont sorties de la zone de jeu et les ramener dans la zone
if(leftPaddleY < 0) {
  leftPaddleY = 0;
}
if(leftPaddleY > canvas.height - paddleHeight) {
  leftPaddleY = canvas.height - paddleHeight;
}
if(rightPaddleY < 0) {
  rightPaddleY = 0;
}
if(rightPaddleY > canvas.height - paddleHeight) {
  rightPaddleY = canvas.height - paddleHeight;
}
  // Dessiner la balle et les raquettes
  drawBall();
  drawPaddle(0, leftPaddleY);
  drawPaddle(canvas.width - paddleWidth, rightPaddleY);

  // Dessiner les scores
  drawScore();

  // Vérifier les collisions
  collisionDetection();

  // Mettre à jour la position de la balle
  ballX += ballSpeedX;
  ballY += ballSpeedY;



  // Redessiner le canevas
  requestAnimationFrame(draw);
}

let leftPaddleUpPressed = false;
let leftPaddleDownPressed = false;
let rightPaddleUpPressed = false;
let rightPaddleDownPressed = false;

function keyDownHandler(event) {
  if(event.keyCode == 38) {
    // Flèche haut pressée
    rightPaddleUpPressed = true;
  } else if(event.keyCode == 40) {
    // Flèche bas pressée
    rightPaddleDownPressed = true;
  } else if(event.keyCode == 83) {
    // Touche "W" pressée
    leftPaddleUpPressed = true;
  } else if(event.keyCode == 87) {
    // Touche "S" pressée
    leftPaddleDownPressed = true;
  }
}

function keyUpHandler(event) {
  if(event.keyCode == 38) {
    // Flèche haut relâchée
    rightPaddleUpPressed = false;
  } else if(event.keyCode == 40) {
    // Flèche bas relâchée
    rightPaddleDownPressed = false;
  } else if(event.keyCode == 83) {
    // Touche "W" relâchée
    leftPaddleUpPressed = false;
  } else if(event.keyCode == 87) {
    // Touche "S" relâchée
    leftPaddleDownPressed = false;
  }
}

function startGame() {
  gameStarted = true;
  document.addEventListener("keydown", keyDownHandler);
  document.addEventListener("keyup", keyUpHandler);
  startButton.style.display = "none";

  requestAnimationFrame(draw);
}

document.getElementById("startButton").addEventListener("click", startGame);
