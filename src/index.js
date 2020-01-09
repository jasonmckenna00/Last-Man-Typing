import Alien from './scripts/aliens'
import Game from './scripts/game';

var background = new Image();
// background.src = '../dist/assets/giphy.gif'


document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementsByTagName("canvas")[0];
    // canvas.width = Game.DIM_X;
    // canvas.height = Game.DIM_Y;
    canvas.width = 800;
    canvas.height = 480;
    const ctx = canvas.getContext("2d");
    const game = new Game(canvas, ctx);
    const userInput = document.getElementById('userInput');
    userInput.autofocus = true;

    
    game.playGame();


    const userForm = document.getElementById('getUserInput');

    userForm.addEventListener('submit',handleSubmit);
    function handleSubmit(e){
        e.preventDefault();
        game.checkWord(userInput.value);
        userForm.reset();
    }
    

});