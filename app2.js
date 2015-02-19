'use strict';



var app = angular.module('guessGame', []);

app.constant('random', function(upper) {
  return Math.floor((Math.random() * upper) + 1);
});

//app.value('player', null);

app.controller('GameCtrl', function($scope, random) {
  $scope.isRegistered = false;
  $scope.player = null;
  $scope.attempts = [];
  $scope.lastAttempt = null;
  $scope.gameOver = false;
  
  function start() {
    $scope.gameOver = false;
    $scope.lastAttempt = null;
    $scope.attempts = [];
    var d = 1000;
    if ($scope.player.difficulty === 'Easy') d = 10;
    if ($scope.player.difficulty === 'Medium') d = 100;
    $scope.numberToGuess = random(d);
  }
  
  $scope.register = function(p) {
    $scope.player = p;
    $scope.isRegistered = true;
    start();
  };
  
  $scope.newGame = function() {
    start();
  }
  
  $scope.guess = function(n) {
    var response = 'correct';
    if (n > $scope.numberToGuess) { response = 'high'; }
    if (n < $scope.numberToGuess) { response = 'low'; }
    $scope.lastAttempt = {
      guess: n,
      response: response,
      player: $scope.player.name
    };
    $scope.attempts.push($scope.lastAttempt);
    $scope.n = '';
    if (response === 'correct') { $scope.gameOver = true; }
  }
});
