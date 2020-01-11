import Alien from './scripts/aliens'
import Game from './scripts/game';
// const fireBaseAPI = require('./scripts/firebasedb')
import * as fireBaseAPI from './scripts/firebasedb';
import addScore from './scripts/firebasedb';




document.addEventListener("DOMContentLoaded", function () {
    // const scores = fireBaseAPI.getScores;
    // fireBaseAPI.getScores().then( scores => {
    //     debugger
    //     console.log(scores)
    // });


    // debugger
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
    
//    const score = addScore;
    const leaderBoard = document.getElementById('leaderboard-stats');
    // const scores = fireBaseAPI.getScores;
    // const test = scores()

    fireBaseAPI.getScores().then( query => {
        const scores = query.docs;
        scores.forEach(score => {
            let newLi = document.createElement('li');
            newLi.setAttribute('class', 'leaderboard-stat-single');
            newLi.innerText = score.data().name + score.data().score + score.data().wpm;
            leaderBoard.appendChild(newLi)
        })
        
    });
    //  
    //     .then( (scores) => {
    //         console.log(scores)
    //     })
    // debugger
    // 






    

});