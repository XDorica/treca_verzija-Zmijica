
        var blockSize = 25;
        var rows = 21;
        var cols = 50;
        var board;
        var context; 

        // Zmijska glava za prvog igrača
        var snakeX = blockSize * 5;
        var snakeY = blockSize * 5;
        var velocityX = 0;
        var velocityY = 0;
        var snakeBody = [];
        
        // Zmijska glava za drugog igrača
        var snake2X = blockSize * 15;
        var snake2Y = blockSize * 15;
        var velocity2X = 0;
        var velocity2Y = 0;
        var snake2Body = [];

        // Hrana
        var foodX;
        var foodY;

        // Score i Highscore
        //var score = 0;
        //var highScore = localStorage.getItem("highScore") || 0; // uzima vrijednost highscorea iz localStorage

        // Score i Highscore za prvog igrača
        //var score1 = 0;
        //var highScore1 = localStorage.getItem("highScore1") || 0;

        // Score i Highscore za drugog igrača
        // var score2 = 0;
        //var highScore2 = localStorage.getItem("highScore2") || 0;

// Score za prvog igrača
var score1 = 0;

// Score za drugog igrača
var score2 = 0;

// Brojač pobjeda za prvog igrača
var player1Wins = 0;

// Brojač pobjeda za drugog igrača
var player2Wins = 0;


        // Game over
        var gameOver = false;
        var gameSpeed = 100; // Defaultna brzina igre

        // Postavljanje okvira igrice
        window.onload = function() {
            board = document.getElementById("board");
            board.height = rows * blockSize;
            board.width = cols * blockSize;
            context = board.getContext("2d"); // za crtanje kvadratića

            placeFood();
            document.addEventListener("keydown", function(e) { changeDirection(e, 'player1'); });
            document.addEventListener("keydown", function(e) { changeDirection(e, 'player2'); });
            gameInterval = setInterval(update, gameSpeed); // Stvaranje intervala
        }

        // Postavljanje cijelog tijela igrice
        function update() {
            if (gameOver) {
                context.fillStyle = "red";
                context.font = "bold 90px Arial";
                context.fillText("Game Over", board.width / 2 - 240, board.height / 2);
                return;
            }

            // Stilizacija okvira
            context.fillStyle="black";
            context.fillRect(0, 0, board.width, board.height);

            // Stilizacija hrane 
            context.fillStyle="red";
            context.beginPath();
            context.arc(foodX + blockSize/2, foodY + blockSize/2, blockSize/2.5, 0, Math.PI * 2); // kružnica
            context.fill(); //kod blocksize/3 smanjila kružnicu

           
            // Sudar zmijice i hrane za prvog igrača
            if (snakeX == foodX && snakeY == foodY) {
            snakeBody.push([foodX, foodY]);
            placeFood();
            score1++; // Povećaj score za prvog igrača
            if (score1 > highScore1) {
            highScore1 = score1; // Postavi novi highscore ako je score veći od trenutnog highscore-a
            localStorage.setItem("highScore1", highScore1); // Spremi novi highscore u localStorage
    }
}

           // Sudar zmijice i hrane za drugog igrača
            if (snake2X == foodX && snake2Y == foodY) {
            snake2Body.push([foodX, foodY]);
            placeFood();
            score2++; // Povećaj score za drugog igrača
            if (score2 > highScore2) {
            highScore2 = score2; // Postavi novi highscore ako je score veći od trenutnog highscore-a
            localStorage.setItem("highScore2", highScore2); // Spremi novi highscore u localStorage
    }
}

            // Stvaranje tijela zmijice za prvog igrača
            for (let i = snakeBody.length-1; i > 0; i--) {
                snakeBody[i] = snakeBody[i-1];
            }
            if (snakeBody.length) {
                snakeBody[0] = [snakeX, snakeY];
            }

            // Stvaranje tijela zmijice za drugog igrača
            for (let i = snake2Body.length-1; i > 0; i--) {
                snake2Body[i] = snake2Body[i-1];
            }
            if (snake2Body.length) {
                snake2Body[0] = [snake2X, snake2Y];
            }

            // Stiliziranje tijela zmijice za prvog igrača
            context.fillStyle="yellow";
            snakeX += velocityX * blockSize;
            snakeY += velocityY * blockSize;
            context.beginPath();
            context.arc(snakeX + blockSize/2, snakeY + blockSize/2, blockSize/2, 0, Math.PI * 2); // kružnica
            context.fill(); //blocksize/3 smanjila kružnicu

            // Stiliziranje tijela zmijice za drugog igrača
            context.fillStyle="blue";
            snake2X += velocity2X * blockSize;
            snake2Y += velocity2Y * blockSize;
            context.beginPath();
            context.arc(snake2X + blockSize/2, snake2Y + blockSize/2, blockSize/2, 0, Math.PI * 2); // kružnica
            context.fill(); //blocksize/3 smanjila kružnicu

            // Crtanje tijela zmije kao kružnica za prvog igrača
            context.fillStyle="green";
            for (let i = 0; i < snakeBody.length; i++) {
                context.beginPath();
                context.arc(snakeBody[i][0] + blockSize/2, snakeBody[i][1] + blockSize/2, blockSize/2.5, 0, Math.PI * 2); // kružnica
                context.fill(); //blocksize/smanjila kružnicu
            }

            // Crtanje tijela plave zmije kao kružnica
            context.fillStyle = "purple";
            for (let i = 0; i < snake2Body.length; i++) {
            context.beginPath();
            context.arc(snake2Body[i][0] + blockSize / 2, snake2Body[i][1] + blockSize / 2, blockSize / 2.5, 0, Math.PI * 2); // kružnica
            context.fill(); //blocksize/smanjila kružnicu
}


            // Game over uvjeti za prvog igrača
            if (snakeX < 0 || snakeX >= cols*blockSize || snakeY < 0 || snakeY >= rows*blockSize) {
                gameOver = true;
                player2Wins++; //ovo nadodala
                displayWinner("Player 2"); //ovo nadodala
            }

            for (let i = 0; i < snakeBody.length; i++) {
                if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
                    gameOver = true;
                    player2Wins++; //ovo nadodala
                    displayWinner("Player 2"); //ovo nadodala
                }
            }

             // Game over uvjeti za drugog igrača
            if (snake2X < 0 || snake2X >= cols*blockSize || snake2Y < 0 || snake2Y >= rows*blockSize) {
                gameOver = true;
                player1Wins++; //ovo nadodala
                displayWinner("Player 1"); //ovo nadodala
            }

            for (let i = 0; i < snake2Body.length; i++) {
                if (snake2X == snake2Body[i][0] && snake2Y == snake2Body[i][1]) {
                    gameOver = true;
                    player1Wins++; //ovo nadodala
                    displayWinner("Player 1"); //ovo nadodala
                }
            }




            // Prikaz score 
            //context.fillStyle = "white";
            context.font = "20px Arial";
            //context.fillText("Score: " + score, 10, 30);
            //context.fillText("High Score: " + highScore, 10, 60);

            // Prikaz score i highscore za prvog igrača
            context.fillStyle = "blue";
            context.fillText("Player 2 Score: " + score2, 10, 30);
            //context.fillText("Player 1 High Score: " + highScore1, 10, 60);

            // Prikaz score i highscore za drugog igrača
            context.fillStyle = "yellow";
            context.fillText("Player 1 Score: " + score1, board.width - 180, 30);
           // context.fillText("Player 2 High Score: " + highScore2, board.width - 220, 60);

// Prikaz broja pobjeda za prvog igrača (ispod score-a)
context.fillStyle = "blue";
context.fillText("Player 2 Wins: " + player2Wins, 10, 50);


// Prikaz broja pobjeda za drugog igrača (ispod score-a)
context.fillStyle = "yellow";
context.fillText("Player 1 Wins: " + player1Wins, board.width - 180, 50);



function displayWinner(winner) {
    context.fillStyle = "red";
    context.font = "bold 50px Arial";
    context.fillText("Winner: " + winner, board.width / 2 - 200, board.height / 4);
}

        }

        // Pomicanje zmijice
        function changeDirection(e, player) {
            if (player === 'player2') {
                if (e.code == "ArrowUp" && velocityY != 1) {
                    velocityX = 0;
                    velocityY = -1;
                }
                else if (e.code == "ArrowDown" && velocityY != -1) {
                    velocityX = 0;
                    velocityY = 1;
                }
                else if (e.code == "ArrowLeft" && velocityX != 1) {
                    velocityX = -1;
                    velocityY = 0;
                }
                else if (e.code == "ArrowRight" && velocityX != -1) {
                    velocityX = 1;
                    velocityY = 0;
                }
            } else if (player === 'player1') {
                if (e.code == "KeyW" && velocity2Y != 1) {
                    velocity2X = 0;
                    velocity2Y = -1;
                }
                else if (e.code == "KeyS" && velocity2Y != -1) {
                    velocity2X = 0;
                    velocity2Y = 1;
                }
                else if (e.code == "KeyA" && velocity2X != 1) {
                    velocity2X = -1;
                    velocity2Y = 0;
                }
                else if (e.code == "KeyD" && velocity2X != -1) {
                    velocity2X = 1;
                    velocity2Y = 0;
                }
            }
        }

        // Postavljanje hrane
        function placeFood() {
            //(0-1) * cols -> (0-19.9999) -> (0-19) * 25
            foodX = Math.floor(Math.random() * cols) * blockSize;
            foodY = Math.floor(Math.random() * rows) * blockSize;
        }

        //ovdje bio kod za levele

        // Ponovno pokretanje igrice
        function resetGame() {
            snakeX = blockSize * 5;
            snakeY = blockSize * 5;
            velocityX = 0;
            velocityY = 0;
            snakeBody = [];

            snake2X = blockSize * 15;
            snake2Y = blockSize * 15;
            velocity2X = 0;
            velocity2Y = 0;
            snake2Body = [];
           
            score = 0;
            gameOver = false;
            placeFood();
        }
   
