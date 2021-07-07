let canvas = document.getElementById('main')
let ctx = canvas.getContext('2d')

let WAVE_CONTROLLER = new WaveController();
let ENEMIES_WAVE_COUNT = 2;

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

let controller
let mainPlayer 
let enemyGenerator
let enemies = []

function startGame(){
    controller = new MovementController(ctx);
    mainPlayer = new Player({x: 100, y: 100}, 100, 30, 'yellow', controller, 100);
    enemyGenerator = new EnemyGenerator(ctx, mainPlayer);
    enemies = enemyGenerator.getEnemiesArray(ENEMIES_WAVE_COUNT);
}

startGame();

function drawBackground(){
    ctx.fillStyle = 'green'
    ctx.fillRect(0,0, canvas.width, canvas.height);
}

function drawPlayerHP(){
    const MAX_HP = mainPlayer.maxhp;

    const CURRENT_HP_PERCENT = mainPlayer.hp * 100 / MAX_HP;

    if(CURRENT_HP_PERCENT >= 60){
        ctx.fillStyle = 'lightgreen'
    }
    else if(CURRENT_HP_PERCENT < 60 && CURRENT_HP_PERCENT >= 20) {
        ctx.fillStyle = 'orange';
    }
    else {
        ctx.fillStyle = 'red';
    }

    ctx.beginPath();
    ctx.rect(mainPlayer.position.x - mainPlayer.radius * 1.6, mainPlayer.position.y - 50, CURRENT_HP_PERCENT, 10);
    ctx.fill()
}

function drawEnemyHP(enemy){
    const MAX_HP = enemy.maxhp;

    const X = 1050;
    const Y = 20;

    const CURRENT_HP_PERCENT = enemy.hp * 100 / MAX_HP;


    if(CURRENT_HP_PERCENT >= 60){
        ctx.fillStyle = 'lightgreen'
    }
    else if(CURRENT_HP_PERCENT < 60 && CURRENT_HP_PERCENT >= 20) {
        ctx.fillStyle = 'orange';
    }
    else {
        ctx.fillStyle = 'red';
    }

    ctx.beginPath();
    ctx.rect(enemy.position.x - enemy.radius * 2.5, enemy.position.y - 40, CURRENT_HP_PERCENT, 10);
    ctx.fill()
}

function drawPlayer(){
    mainPlayer.act();
    mainPlayer.draw();
    drawPlayerHP(mainPlayer.hp);
}

function drawEnemies(){

    for(const enemy of enemies){
        enemy.act();
        drawEnemyHP(enemy);
        enemy.draw();

        if(enemy.dieFlag){
            const index = enemies.indexOf(enemy);
            enemies.splice(index, 1);
            WAVE_CONTROLLER.tryStartGame();
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