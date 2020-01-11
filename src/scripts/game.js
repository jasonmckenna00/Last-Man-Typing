import Alien from './aliens';
// import * as fireBaseAPI from './firebasedb';


var earth0 = new Image();
var earth1 = new Image();
var earth2 = new Image();
var earth3 = new Image();

earth0.src = '../../dist/assets/earth0.png';
earth1.src = '../../dist/assets/earth1.png';
earth2.src = '../../dist/assets/earth2.png';
earth3.src = '../../dist/assets/earth3.png';


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
        this.lives = 10;
        this.spawnrate = -1000;
        this.time = 1;
        this.wpm = 0;
        this.wordsDisplayed = false;
        this.frameRate = 0;
        this.timerOn = true;
        this.onScreen = true;

        this.draw = this.draw.bind(this);
        this.playGame = this.playGame.bind(this);
        this.generateAliens = this.generateAliens.bind(this);
        this.createAlien = this.createAlien.bind(this);
        this.checkWord = this.checkWord.bind(this);
        this.restartgame = this.restartgame.bind(this);
        this.timer = this.timer.bind(this)
        this.newHighScoreModal = this.newHighScoreModal.bind(this)

        this.generateAliens();
        this.gameIntervals();
        // debugger
        // fireBaseAPI.getScores()
        //     .then( () => console.log(this.leaderBoard));
    

    }

    gameIntervals(){
        if (this.onScreen){
            setInterval( () => {
                this.timer()
            },500)
    
            setInterval( () => {
                if (this.spawnrate < 1000) this.spawnrate += 400;
                
            },20000)
    
            setInterval( () => {
                this.dx += .2;
            },10000)
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
        let i = this.wordArray.indexOf(word);
        this.typedChars += word.length;
        if (i != -1){
            this.score += 1;
            this.alienArray.splice(i,1);
            this.wordArray.splice(i,1);
            this.wordsDisplayed = this.wordArray.length ? true : false; 
            
        }
    }

    
    timer(){
        if (this.wordsDisplayed && this.timerOn){
            this.time += 0.5;

            this.wpm = (this.typedChars/5) / (this.time/60);
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
        this.ctx.fillText('speed ' + this.spawnrate, this.canvas.width - 180,90);

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
            if (this.alienArray[i].rendered){
                this.alienArray[i].update(this.frameRate);
            } 
            else {
                this.lives -= 1;
                this.alienArray.splice(i,1);
                this.wordArray.splice(i,1);
            }
        }
    }

    playGame(){
        requestAnimationFrame(this.playGame);
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
            this.losingScreen();
            document.addEventListener("keydown", this.restartgame, false);
            
        }
    }

    restartgame(e){
        if (e.key != 'r') return;
        this.alienArray = [];
        this.wordArray = [];
        this.dx = .5;
        this.score = 0;
        this.lives = 10;
        this.spawnrate = 0;
        this.time = 0;
        this.typedChars = 0;
        const form = document.getElementById('getUserInput');
        form.style.display = 'flex'
        clearInterval(this.timer());
        this.timerOn = true;
        document.removeEventListener('keydown',this.restartgame,false)
    }

    losingScreen(){
        // const highScore = fireBase.checkScore(this.score);
        const form = document.getElementById('getUserInput');
        form.style.display = 'none';
        const w = 550;
        const h = 300;
        this.ctx.font = '30px Frijole';
        // this.ctx.fillStyle = "be9fe1";
        // this.ctx.fillRect( this.canvas.width/2 - w/2, this.canvas.height/2 - h/2, w, h);
        this.ctx.fillStyle = '#d89cf6';

     
        // if (highScore){
        //     this.newHighScoreModal()
        // } else {
        //     this.ctx.fillText('Earth Was Destroyed!', this.canvas.width/2-215, 90);
        // }

        
        this.ctx.font = '23px Frijole';
        this.ctx.fillText('Your Stats',this.canvas.width/2 - 80, 130);
        this.ctx.fillText('Score: ' + this.score,this.canvas.width/2 - 80, 160);
        this.ctx.fillText('WPM: '+ this.wpm.toFixed(2),this.canvas.width/2 - 80, 190);



        this.ctx.font = '20px Frijole';
        this.ctx.fillText('Press r to restart', this.canvas.width/2 - 130, this.canvas.height/2 + 210);
    }

    newHighScoreModal(){
        this.ctx.font = '30px Frijole';
        this.ctx.fillStyle = '#d89cf6';
        this.ctx.fillText('New High Score!', this.canvas.width/2-175, 90);

        this.ctx.font = '20px Frijole';
        this.ctx.fillText('Join the Leaderboard!' + this.score,this.canvas.width/2 - 160,this.canvas.height/2 + 90);


        





        const newForm = document.createElement('form');
        const newInput = document.createElement('input');
        newInput.setAttribute('type', 'text');
        newInput.setAttribute('value', '')
        newInput.autofocus = true;
        newForm.appendChild(newInput)
        newForm.addEventListener('submit', handleSubmit );
        this.canvas.appendChild(newForm)

        function handleSubmit(e){
            e.preventDefault();
            game.addHighScore(newInput.value);
            newForm.reset();
        }

    }

    addHighScore(word){
        if (word.trim()) console.log('worked')
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
}


export default Game