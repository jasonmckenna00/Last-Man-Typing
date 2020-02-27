import Alien from './aliens';
import * as fireBaseAPI from './firebasedb';
import earth0Picture from '../../src/assets/earth0.png';
import earth1Picture from '../../src/assets/earth1.png';
import earth2Picture from '../../src/assets/earth2.png';
import earth3Picture from '../../src/assets/earth3.png';
import {updateLeaderBoard} from '../index'


var earth0 = new Image();
var earth1 = new Image();
var earth2 = new Image();
var earth3 = new Image();

earth0.src = earth0Picture;
earth1.src = earth1Picture;
earth2.src = earth2Picture;
earth3.src = earth3Picture;


// debugger


class Game {
    constructor(canvas, ctx){
        
        this.canvas = canvas;
        this.ctx = ctx;
        this.alienArray = [];
        this.wordArray = [];
        this.typedChars = 0;
        this.dx = 1.7;
        this.score = 0;
        this.lives = 1;
        this.spawnrate = 0;
        this.time = 1;
        this.wpm = 0;
        this.wordsDisplayed = false;
        this.frameRate = 0;
        this.timerOn = true;
        this.onScreen = true;
        this.gameOver = false;
        this.startGame = false;

        this.draw = this.draw.bind(this);
        this.playGame = this.playGame.bind(this);
        this.generateAliens = this.generateAliens.bind(this);
        this.createAlien = this.createAlien.bind(this);
        this.checkWord = this.checkWord.bind(this);
        // this.restartgame = this.restartgame.bind(this);
        this.timer = this.timer.bind(this)
        this.newHighScoreModal = this.newHighScoreModal.bind(this)
        this.updateLeaderBoard = this.updateLeaderBoard.bind(this)
        // this.loadEarth();
        this.updateLeaderBoard();
        // this.generateAliens();
        // this.gameIntervals();

        // document.addEventListener("keydown",this.restartgame, false);

    }



    gameIntervals(){
        if (this.onScreen){
            setInterval( () =>  this.timer(),500)
            setInterval( () => this.dx += .2,10000);   
            
    
            setInterval( () => {
                if (this.spawnrate < 1000) this.spawnrate += 400;
            },20000)
        } else {
            clearInterval(timer)
        }
    }




    createAlien(ctx,canvas,dx){
        let alien = new Alien(ctx,canvas,dx);
        this.alienArray.push(alien);
        this.wordArray.push(alien.word);
    };  

    generateAliens(){
        let delay = Math.floor(Math.random() * 5000);
        if (this.onScreen){
            setTimeout(()=>{
                this.createAlien(this.ctx,this.canvas, this.dx);
                this.generateAliens();
            },delay - this.spawnrate)
        }
    }




    checkWord(word){
        if (!this.timerOn || word.length > 15 || word.length < 2) return
        let i = this.wordArray.indexOf(word);
        this.typedChars += word.length;
        if (i != -1){
            this.score += 1;
            this.alienArray[i].destroyed = true;           
            this.wordsDisplayed = this.wordArray.length ? true : false; 
            
        }
    }

    
    timer(){
        if (this.wordsDisplayed && this.timerOn){
            this.time += 0.5;
            this.wpm = 1.5*(this.typedChars/5) / (this.time/60);
        }
        else {
            return null;
        }
    }
    
    


    draw(){
        this.frameRate += 1;
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.font = '20px Frijole'
        this.ctx.fillText('Score: ' + this.score, 60, this.canvas.height -  60);
        this.ctx.fillText('lives ' + this.lives, this.canvas.width - 120,30);
        this.ctx.fillText('WPM ' + this.wpm.toFixed(2), this.canvas.width - 170,this.canvas.height -  60);
        // this.ctx.fillText('speed ' + this.dx, this.canvas.width - 180,90);

        let earth;
        if (this.lives > 7){
            earth = earth0;
        } else if (this.lives <= 7 && this.lives > 4){
            earth = earth1;
        } else if (this.lives <= 4 && this.lives > 1){
            earth = earth2;
        } else if (this.lives === 1){
            earth = earth3;
        }

        this.ctx.drawImage(earth, this.canvas.width - 100, this.canvas.height/2 - 90,200,200)


        for (let i = 0; i < this.alienArray.length; i++){
            const currAlien = this.alienArray[i];
            if (currAlien.rendered){
                if (!currAlien.explosionCounter){
                    this.alienArray.splice(i,1);
                    this.wordArray.splice(i,1);
                }
                currAlien.update(this.frameRate);
            } 
            else {
                this.lives -= 1;
                this.alienArray.splice(i,1);
                this.wordArray.splice(i,1);
            }
        }
    }

    playGame(){
        if (!this.startGame){
            this.generateAliens();
            this.gameIntervals();
            this.startGame = true;
            const userInput = document.getElementById('userInput');
            userInput.autofocus = true;
        }
        var animation = requestAnimationFrame(this.playGame);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.borderGradients();

        
        window.onblur = () => this.onScreen = false;
        window.onfocus = () => {
            this.onScreen = true;
            this.gameIntervals();
            this.generateAliens();
        }
        
        
        const userInput = document.getElementById('userInput');
        this.canvas.addEventListener('click', () => userInput.focus());


        this.wordsDisplayed = this.wordArray.length ? true : false; 
        if (this.lives > 0){
            this.draw();
        } else {
            this.timerOn = false;
            
            cancelAnimationFrame(animation)
            this.losingScreen();
            
        }
    }


    losingScreen(){
        const highScore = fireBaseAPI.checkScore(this.score);
        const form = document.getElementById('getUserInput');
        form.style.display = 'none';
        const w = 550;
        const h = 300;
        this.ctx.font = '30px Frijole';
        this.ctx.fillStyle = '#d89cf6';
        // debugger
        
        if (highScore){
            this.newHighScoreModal()    
        } else {
            this.ctx.fillText('Earth Was Destroyed!', this.canvas.width/2-215, 90);
        }
        
        this.ctx.font = '23px Frijole';
        this.ctx.fillText('Your Stats',this.canvas.width/2 - 80, 130);
        this.ctx.fillText('Score: ' + this.score,this.canvas.width/2 - 80, 160);
        this.ctx.fillText('WPM: '+ this.wpm.toFixed(2),this.canvas.width/2 - 80, 190);



        this.ctx.font = '20px Frijole';
        this.ctx.fillText('Press Ctrl+Space to restart', this.canvas.width/2 - 190, this.canvas.height/2 + 210);
    }

    // restartgame(e){
    //     if (e.code == 'Space' && (event.ctrlKey)) {
    //         // this.alienArray = [];
    //         // this.wordArray = [];
    //         // this.dx = 1.7;
    //         // this.score = 0;
    //         // this.lives = 10;
    //         // this.spawnrate = 0;
    //         // this.time = 0;
    //         // this.typedChars = 0;
    //         // const form = document.getElementById('getUserInput');
    //         // form.style.display = 'flex';

    //         // // clearInterval(this.timer());
    //         // this.timerOn = true;
    //         // requestAnimationFrame(this.playGame)
    //         // cancelAnimationFrame(animation)
    //         // this.playGame()
    //         const game = new Game(this.canvas, this.ctx);
    //         game.playGame();
    //     } else {
    //         return
    //     }

    // }


    newHighScoreModal(){
        this.ctx.font = '30px Frijole';
        this.ctx.fillStyle = '#d89cf6';
        this.ctx.fillText('New High Score!', this.canvas.width/2-175, 90);

        this.ctx.font = '20px Frijole';
        this.ctx.fillText('Join the Leaderboard!',this.canvas.width/2 - 170,this.canvas.height/2 + 90);

        const leaderBoardEntry = document.getElementById('leaderboard-entry');
        const newForm = document.createElement('form');
        const newInput = document.createElement('input');
        newInput.setAttribute('type', 'text');
        newInput.setAttribute('value', '')
        newInput.autofocus = true;
        newForm.appendChild(newInput)
        newForm.addEventListener('submit', handleSubmit );
        leaderBoardEntry.appendChild(newForm)
        const score = this.score;
        const wpm = this.wpm

        function handleSubmit(e){
            e.preventDefault();

            fireBaseAPI.addScore(newInput.value, score, wpm.toFixed(2)).then( () => {
                
                while (leaderBoardEntry.firstChild) {
                    leaderBoardEntry.removeChild(leaderBoardEntry.firstChild);
                }
                this.updateLeaderBoard();
                // this.gameOver = true
            });
            
        }

    }



    borderGradients(){
        var gradient = this.ctx.createLinearGradient(0,this.canvas.height - 120 ,0, this.canvas.height - 90);
        gradient.addColorStop(0, "rgba(0, 0, 0, 0.5)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 1.0)");
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, this.canvas.height, this.canvas.width, -120)

        var gradient1 = this.ctx.createLinearGradient(0,230 ,0, 0);
        gradient1.addColorStop(0, "rgba(0, 0, 0, 0.1)");
        gradient1.addColorStop(0.5, "rgba(0, 0, 0, 0.5)");
        gradient1.addColorStop(0.75, "rgba(0, 0, 0, 0.8)");
        gradient1.addColorStop(1, "rgba(0, 0, 0, 1.0)");
        this.ctx.fillStyle = gradient1;
        this.ctx.fillRect(0, 0, this.canvas.width, 120)
    }


    updateLeaderBoard(){
        const leaderBoard = document.getElementById('leaderboard-stats');
        while (leaderBoard.firstChild) {    
            leaderBoard.removeChild(leaderBoard.firstChild);
        }
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
        })
    }
}


export default Game