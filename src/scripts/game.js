import Alien from './aliens'


class Game {
    constructor(canvas, ctx){
        this.canvas = canvas;
        this.ctx = ctx;
        this.alienArray = [];
        this.wordArray = [];
        this.dx = 5.5;
        this.score = 0;
        this.lives = 10;
        this.spawnrate = 0



        this.draw = this.draw.bind(this);
        this.playGame = this.playGame.bind(this);
        this.generateAliens = this.generateAliens.bind(this);
        this.createAlien = this.createAlien.bind(this);
        this.checkWord = this.checkWord.bind(this);
        this.restartgame = this.restartgame.bind(this);
        this.generateAliens()
        
        setInterval( () => {
            this.dx += .2,
            this.spawnrate += 1000;
        }
        ,15000)
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
        if (i >= 0){
            this.score += 1;
            this.alienArray.splice(i,1);
            this.wordArray.splice(i,1);
        }
    }


    draw(){
        this.ctx.fillText(this.score, this.canvas.width - 30, 30)
        this.ctx.fillText('lives ' + this.lives, this.canvas.width - 60, 60)
        for (let i = 0; i < this.alienArray.length; i++){
            if (this.alienArray[i].rendered){
                this.alienArray[i].update();
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
        this.spawnrate = 0
        document.removeEventListener('keydown',this.restartgame,false)
    }

    losingScreen(){
        this.ctx.fillText('loser', 30, 30)
    }
}


export default Game