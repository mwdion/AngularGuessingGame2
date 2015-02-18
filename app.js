function getRandomNumber(upper) {
    return Math.floor((Math.random() * upper) + 1);
}
(function(){
  var app = angular.module('guessGame', []);

app.controller('GameController', function($scope, $timeout){
  var randomNumber;
  var guessCount = 0;
  this.playerName = ' ';
  this.upper = ' ';
  this.randomNumber = getRandomNumber();
  this.state = 1; // start screen
  this.flash = '';

  this.updateUpper = function(upper){
    this.upper = upper;
    randomNumber = getRandomNumber(upper);
    console.log(upper);
    console.log(randomNumber);
  };

  
  this.setState = function(newState) {
            this.state = newState;
            this.playerGuess = 0;
            console.log($scope.upper);

            if(newState == 3) { // flash screen
                $timeout(function() {
                    $scope.game.state = 2; // go back to guessing
                }, 2250);
            }

            if(newState == 4) { // won
                $timeout(function() {
                    $scope.game.resetGame();
                }, 2250);
                console.log(this.playerGuess);
            }
        };
  this.guess = function() {
            var parsedGuess = parseInt(this.playerGuess);
            this.randomNumber = randomNumber;
            // guessing logic
            console.log(randomNumber);
            if(parsedGuess == this.randomNumber) {
                this.flash = 'You got it!';
                this.setState(4);
                guessCount += 1;
                this.guessCount = guessCount;
            } else if (parsedGuess < this.randomNumber) {
                this.flash = 'Too low! Guess Again.';
                this.setState(3);
                guessCount += 1;
                this.guessCount = guessCount;
            } else if (parsedGuess > this.randomNumber) {
                this.flash = 'Too high! Guess Again.';
                this.setState(3);
                guessCount += 1;
                this.guessCount = guessCount;
            }
            console.log(guessCount);
        };

  this.resetGame = function() {
            this.state = 1;
            this.playerGuess = 0;
            console.log($scope.upper);
            this.flash = '';
            guessCount = 0;
        };

});

})();
