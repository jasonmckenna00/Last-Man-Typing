import Alien from './scripts/aliens'
import Game from './scripts/game';
// const fireBaseAPI = require('./scripts/firebasedb')
// import * as fireBaseAPI from './scripts/firebasedb';
// import addScore from './scripts/firebasedb';




document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("keydown",restartgame, false);
    document.addEventListener("keypress", handleSpace, false);
    
    const canvas = document.getElementsByTagName("canvas")[0];
    canvas.width = 800;
    canvas.height = 480;
    const ctx = canvas.getContext("2d");
    const userInput = document.getElementById('userInput');
    var game = new Game(canvas, ctx);
    userInput.autofocus = true;

    document.addEventListener("keypress", removeLandingPage);
    function removeLandingPage(e){
        if (e.key === 'Enter'){
            const landing = document.getElementById('landing');
            landing.style.display = 'none';
            document.removeEventListener("keypress", removeLandingPage);
            game.playGame();
            userInput.focus();


        }
    }
    

    
    const userForm = document.getElementById('getUserInput');
    userForm.addEventListener('submit',handleSubmit);
    function handleSubmit(e){
        e.preventDefault();
        // debugger
        game.checkWord(userInput.value.toLowerCase().trim());
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
                const userInput = document.getElementById('userInput');
                game = null;
                game = new Game(canvas, ctx);
                userInput.autofocus = true;
                const form = document.getElementById('getUserInput');
                form.style.display = 'block';
                game.playGame();

            } 
        }
});
