let canvas = document.getElementById('main')
let ctx = canvas.getContext('2d')

let FPS = 0;
let secondsPassed = 0;
let oldTimeStamp = 0;

const keyCodes = {
    'KeyW' : 'move_up',
    'KeyS' : 'move_down',
    'KeyA' : 'move_left',
    'KeyD' : 'move_right',
    'KeyEnter' : 'enter',
    'ShiftLeft': 'run'
}

const controller = new MovementController(ctx);
const mainPlayer = new Player({x: 100, y: 100}, 100, 30, 'yellow', controller);
//const enemy = new Enemy()

let enemies = [
    new Enemy(ctx, {x: 500, y: 500}, 1, 20, 'red', mainPlayer)
]

function drawBackground(){
    ctx.fillStyle = 'green'
    ctx.fillRect(0,0, canvas.width, canvas.height);
}

function drawPlayer(){
    mainPlayer.act();
    mainPlayer.draw(); 
}

function drawEnemies(){

    for(const enemy of enemies){
        enemy.act();
        enemy.draw();
    }
}

function gameLoop(timestamp){

    secondsPassed = (timestamp - oldTimeStamp) / 1000;
    secondsPassed = Math.min(secondsPassed, 0.1);
    oldTimeStamp = timestamp;

    clearCanvas();
    drawCall();
    drawFPS();
    window.requestAnimationFrame(gameLoop)
}

function drawFPS(){
    FPS = Math.round(1 / secondsPassed)
    ctx.font = '22px Verdana';
    ctx.fillStyle = 'white'
    ctx.fillText(`FPS: ${FPS}`, 20, 20)
}

function drawCall(){
    drawBackground();
    drawPlayer();
    drawEnemies();
    checkBulletCollisions()
}

function checkBulletCollisions(){
    
    for(const enemy of enemies){
        for(const bullet of enemy.bullets){
            mainPlayer.checkCollision(bullet)
        }
    }

    for(const bullet of mainPlayer.bullets){
        for(const enemy of enemies){
            enemy.checkCollision(bullet)
        }
    }
}

function clearCanvas(){
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function onMousePress(event){
    event.preventDefault();

    if(event.target.id === 'main')
        mainPlayer.shoot();
    
}


function HandleMouseMove(event){
    if(event.target.id === 'main'){
        let rect = canvas.getBoundingClientRect();
        let x = event.pageX - rect.left;
        let y = event.pageY - rect.top

        mainPlayer.controller.setMousePosition(x, y);
    }
}

document.addEventListener('keyup', (event) => mainPlayer.controller.handleKey(event))
document.addEventListener('keydown', (event) => mainPlayer.controller.handleKey(event))


document.addEventListener('mousedown', (event) => onMousePress(event))
document.addEventListener('mousemove', HandleMouseMove);

window.requestAnimationFrame(gameLoop)