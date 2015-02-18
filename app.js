function getRandomNumber( upper ) {
  return Math.floor(Math.random() * upper) + 1; 
  }
(function(){
  var app = angular.module('guessGame', []);

app.controller('GameController', function(){
  this.playerName = ' ';
  this.upper = ' ';
  this.state = 1; // start screen
  this.guessCount = 0;
  this.randomNumber = getRandomNumber(this.upper);
  this.flash = '';
  
  this.setState = function(newState) {
            this.state = newState;
            this.guessCount = 0;

            if(newState == 3) { // flash screen
                $timeout(function() {
                    $scope.game.state = 2; // go back to guessing
                }, 2500);
            }

            if(newState == 4) { // won
                $timeout(function() {
                    $scope.game.resetGame();
                }, 2500);
            }
        };





});

})();
