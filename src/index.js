import Alien from './scripts/aliens'
import Game from './scripts/game';
// const fireBaseAPI = require('./scripts/firebasedb')
import * as fireBaseAPI from './scripts/firebasedb';
import addScore from './scripts/firebasedb';




document.addEventListener("DOMContentLoaded", function () {

    const canvas = document.getElementsByTagName("canvas")[0];
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
