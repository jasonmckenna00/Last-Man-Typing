import Alien from './aliens'
var earth0 = new Image();
var earth1 = new Image();
var earth2 = new Image();
var earth3 = new Image();

earth0.src = '../../dist/assets/earth0.png';
earth1.src = '../../dist/assets/earth1.png';
earth2.src = '../../dist/assets/earth2.png';
earth3.src = '../../dist/assets/earth3.png';


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
            if (this.spawnrate < 1200)
            this.spawnrate += 400;
        },20000)

        setInterval( () => {
            this.dx += .2;
            // this.spawnrate += 500;
        },10000)


    

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
        // this.ctx.fillText('speed ' + this.dx, this.canvas.width - 150,90);

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
        


        this.wordsDisplayed = this.wordArray.length ? true : false; 
        if (this.lives > 0){
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