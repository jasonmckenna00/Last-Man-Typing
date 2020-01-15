import Alien from './scripts/aliens'
import Game from './scripts/game';
// const fireBaseAPI = require('./scripts/firebasedb')
import * as fireBaseAPI from './scripts/firebasedb';
import addScore from './scripts/firebasedb';




document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("keydown",restartgame, false);
    document.addEventListener("keypress", handleSpace, false);
    const canvas = document.getElementsByTagName("canvas")[0];
    canvas.width = 800;
    canvas.height = 480;
    const ctx = canvas.getContext("2d");
    const userInput = document.getElementById('userInput');
    userInput.autofocus = true;
    
    
    var game = new Game(canvas, ctx);
    game.playGame();

    
    const userForm = document.getElementById('getUserInput');
    userForm.addEventListener('submit',handleSubmit);
    function handleSubmit(e){
        e.preventDefault();
        game.checkWord(userInput.value.trim());
        userForm.reset();
    }

    function handleSpace(e){
        if (e.key == ' '){
            handleSubmit(e);
        }
    }
    
   
// const game = new Game(canvas, ctx);

function restartgame(e){
        if (e.code === 'Space' && (event.ctrlKey)) {

            game = null;
            const newGame = new Game(canvas, ctx);
            newGame.playGame();
        } 
    }




    

});
