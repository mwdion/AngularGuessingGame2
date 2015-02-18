(function(){
  var app = angular.module('guessGame', []);

app.controller('GameController', function($scope, $timeout){
  this.playerName = ' ';
  this.upper = ' ';
  this.state = 1; // start screen
  this.guessCount = 0;
  this.randomNumber = ' ';
  this.flash = '';

  // this.setUpper = function(newUpper){
  //   this.upper = newUpper;
  // };

  // this.getRandomNumber = function(upper){
  //   this.upper = upper;
  //   return Math.floor(Math.random() * upper) + 1;
  // };
  
  this.setState = function(newState) {
            this.state = newState;
            this.playerGuess = 0;

            if(newState == 3) { // flash screen
                $timeout(function() {
                    $scope.game.state = 2; // go back to guessing
                }, 3000);
            }

            if(newState == 4) { // won
                $timeout(function() {
                    $scope.game.resetGame();
                }, 3000);
                console.log(this.playerGuess);
            }
        };
  this.guess = function() {
            var parsedGuess = parseInt(this.playerGuess);
            // guessing logic
            console.log(this.randomNumber);
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
            this.randomNumber = getRandomNumber(upper);
            this.flash = '';
        };

});

})();
