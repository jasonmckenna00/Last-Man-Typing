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
    
    const leaderBoard = document.getElementById('leaderboard-stats');

    fireBaseAPI.getScores().then( query => {
        const scores = query.docs;
        scores.forEach(entry => {
            const {name, score, wpm} = entry.data();
            let newLi = document.createElement('li');
            let newName = document.createElement('h3');
            let newScore = document.createElement('h3');
            let newWPM = document.createElement('h3');
            newName.innerHTML= name.slice(0,3);
            newScore.innerHTML= score;
            newWPM.innerHTML= wpm;
            newLi.appendChild(newName);
            newLi.appendChild(newScore);
            newLi.appendChild(newWPM);           
            newLi.setAttribute('class', 'leaderboard-stat-single');
            leaderBoard.appendChild(newLi)
        })
        
    });





    

});