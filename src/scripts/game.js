import Alien from './aliens'


class Game {
    constructor(canvas, ctx){
        this.canvas = canvas;
        this.ctx = ctx;
        this.alienArray = [];
        this.wordArray = [];
        this.typedChars = 0;
        this.dx = 0.5;
        this.score = 0;
        this.lives = 10;
        this.spawnrate = -1000;
        this.time = 1;
        this.wpm = 0;
        this.wordsDisplayed = false;
        this.frameRate = 0;


        this.draw = this.draw.bind(this);
        this.playGame = this.playGame.bind(this);
        this.generateAliens = this.generateAliens.bind(this);
        this.createAlien = this.createAlien.bind(this);
        this.checkWord = this.checkWord.bind(this);
        this.restartgame = this.restartgame.bind(this);
        this.timer = this.timer.bind(this)
        this.generateAliens()
        // this.timer();

        setInterval( () => {
            this.timer()
        },500)

        setInterval( () => {
            // this.dx += .2,
            this.spawnrate += 750;
        },15000)


    

    }

    createAlien(ctx,canvas,dx){
        let alien = new Alien(ctx,canvas,dx);
        this.alienArray.push(alien);
        this.wordArray.push(alien.word);
    };  

    generateAliens(){
        let delay = Math.floor(Math.random() * 5000);

        setTimeout(()=>{
            this.createAlien(this.ctx,this.canvas, this.dx);
            this.generateAliens();
        },delay - this.spawnrate)
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

    wordPerMinute(word){
        this.wpm = (word.length / 5) / this.mins;
    }

    
    timer(){
        if (this.wordsDisplayed){
            this.time += 0.5;

            this.wpm = 1.5*(this.typedChars/5) / (this.time/60);
        }
        else {
            return null;
        }
    }
    
    


    draw(){
        this.frameRate += 1;
        this.ctx.fillText('Score: ' + this.score, this.canvas.width - 60, 30);
        this.ctx.fillText('lives ' + this.lives, this.canvas.width - 60, 60);
        this.ctx.fillText('Time ' + this.time, this.canvas.width - 100, 90);
        this.ctx.fillText('WPM ' + this.wpm, this.canvas.width - 100, 120);
        this.ctx.fillText('wordsDisplayed ' + this.wordsDisplayed, this.canvas.width - 150, 150);



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

        this.wordsDisplayed = this.wordArray.length ? true : false; 
        
        if (this.lives > 0){
            // this.timer();
            this.draw();
        } else {
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
        // this.wpm = 0;
        this.typedChars = 0;
        clearInterval(this.timer())
        document.removeEventListener('keydown',this.restartgame,false)
    }

    losingScreen(){
        this.ctx.fillText('Press r to restart', 30, 30)
    }
}


export default Game