import Alien from './scripts/aliens'


document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementsByTagName("canvas")[0];
    // canvas.width = Game.DIM_X;
    // canvas.height = Game.DIM_Y;
    canvas.width = 800;
    canvas.height = 320;


    const ctx = canvas.getContext("2d");
    // const game = new Game();
    // new GameView(game, ctx).start();

    


    function Alien(){
        this.size = 30;
        this.AlienXVel = 1;
        this.rndPos = Math.floor(Math.random() * 320);
        

        this.draw = function (){
            // debugger
            ctx.beginPath();
            ctx.rect(0 + this.AlienXVel,this.rndPos,this.size/2,this.size);
            ctx.fillStyle = '#ff0000';
            ctx.fill();
            ctx.closePath();
            // console.log('asas')
        }

        this.update = function(){
            this.AlienXVel += 1;
            this.draw();
        }


    }

    var AlienXVel = 1;
    var alienArray = []

    var delay = Math.floor(Math.random() * 2500);
    setInterval(()=>alienArray.push(new Alien()),delay)


    function randomSpawn(i){
        setTimeout(function () {
            alienArray[i].update()
        }, 1000*i)
    }

function draw(){
    requestAnimationFrame(draw)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < alienArray.length; i++){
        // let delay = Math.floor(Math.random() * 1000);
        // console.log(delay)
        alienArray[i].update();
        
        
        
    }
    // alien.update();
}
// setInterval(draw,75);
draw()
  });