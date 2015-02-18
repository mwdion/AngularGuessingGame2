function getRandomNumber(upper) {
    return Math.floor((Math.random() * upper) + 1);
}
(function(){
  var app = angular.module('guessGame', []);

app.controller('GameController', function($scope, $timeout){
  var randomNumber;
  this.playerName = ' ';
  this.upper = ' ';
  this.randomNumber = getRandomNumber();
  this.state = 1; // start screen
  this.guessCount = 0;
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
            } else if (parsedGuess < this.randomNumber) {
                this.flash = 'Too low! Guess Again.';
                this.setState(3);
            } else if (parsedGuess > this.randomNumber) {
                this.flash = 'Too high! Guess Again.';
                this.setState(3);
            }
        };

  this.resetGame = function() {
            this.state = 1;
            this.playerGuess = 0;
            console.log($scope.upper);
            this.flash = '';
        };

});

})();
