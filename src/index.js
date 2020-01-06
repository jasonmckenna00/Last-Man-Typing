


document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementsByTagName("canvas")[0];
    // canvas.width = Game.DIM_X;
    // canvas.height = Game.DIM_Y;
    canvas.width = 800;
    canvas.height = 320;


    const ctx = canvas.getContext("2d");
    // const game = new Game();
    // new GameView(game, ctx).start();

    var AlienXVel = 1;


    function drawAlien(size){
        ctx.beginPath();
        ctx.rect(80 + AlienXVel,80,size,size);
        ctx.fillStyle = '#ff0000';
        ctx.fill();
        ctx.closePath();
    }

    function draw(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawAlien(30);
        AlienXVel += 1;
    }
    setInterval(draw,75);

  });