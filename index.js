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

let controller = new MovementController(ctx);
let mainPlayer = new Player({x: 100, y: 100}, 100, 30, 'yellow', controller, 100);

let enemies = [
    new Enemy(ctx, getRandomCanvasPosition(), 1, 20, 'red', mainPlayer, 30),
    new Enemy(ctx, getRandomCanvasPosition(), 1, 20, 'red', mainPlayer, 30),
    new Enemy(ctx, getRandomCanvasPosition(), 1, 20, 'red', mainPlayer, 30),
    new Enemy(ctx, getRandomCanvasPosition(), 1, 20, 'red', mainPlayer, 30),
]


function startGame(){

    controller = new MovementController(ctx);
    mainPlayer = new Player({x: 100, y: 100}, 100, 30, 'yellow', controller, 100);

    enemies = [];
    enemies = [
        new Enemy(ctx, getRandomCanvasPosition(), 1, 20, 'red', mainPlayer, 30),
        new Enemy(ctx, getRandomCanvasPosition(), 1, 20, 'red', mainPlayer, 30),
        new Enemy(ctx, getRandomCanvasPosition(), 1, 20, 'red', mainPlayer, 30),
        new Enemy(ctx, getRandomCanvasPosition(), 1, 20, 'red', mainPlayer, 30),
    ];

}

function getRandomCanvasPosition(){
    
    let x = 0 + Math.random() * (canvas.clientWidth + 1 - 0);
    let y = 0 + Math.random() * (canvas.clientHeight + 1 - 0);

    return {x , y};
}

function drawBackground(){
    ctx.fillStyle = 'green'
    ctx.fillRect(0,0, canvas.width, canvas.height);
}

function drawHP(hp){
    const MAX_HP = mainPlayer.maxhp;

    const X = canvas.clientWidth / 2;
    const Y = canvas.clientHeight / 2;

    const CURRENT_HP_PERCENT = mainPlayer.hp * 100 / MAX_HP;

    if(CURRENT_HP_PERCENT > 50){
        ctx.fillStyle = 'blue'
    }
    else{
        ctx.fillStyle = 'blue'
    }

    ctx.beginPath();
    ctx.rect(X, Y, CURRENT_HP_PERCENT, 10);
}

function drawPlayer(){
    mainPlayer.act();
    mainPlayer.draw();
    drawHP(mainPlayer.hp);
}

function drawEnemies(){

    for(const enemy of enemies){
        enemy.act();
        enemy.draw();

        if(enemy.dieFlag){
            const index = enemies.indexOf(enemy);
            enemies.splice(index, 1);
        }
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