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
}



let PLAYER = {
    position: {
        x : 100,
        y : 100
    },
    speed: 50,
    radius: 50,
    color: '#ffb6c1',
    stroke: 'black'
}

let CONTROLLER = {

    isMoving: false,
    up: false,
    down: false,
    left: false,
    right: false,

    act(){
        if(this.up){
            PLAYER.position.y -= (PLAYER.speed * secondsPassed);
        }
        if(this.down){
            PLAYER.position.y += (PLAYER.speed * secondsPassed)
        }
        if(this.left){
            PLAYER.position.x -= (PLAYER.speed * secondsPassed);
        }
        if(this.right){
            PLAYER.position.x += (PLAYER.speed * secondsPassed);
        }
    },
}

let ENEMY = {
    position: {
        x : 0,
        y : 0
    },
    speed: 50,
    radius: 50,
    color: 'red',
    stroke: 'black'
}

const CENTER_X = ctx.width / 2;
const CENTER_Y = ctx.height / 2;

function drawBackground(){
    ctx.fillStyle = 'green'
    ctx.fillRect(0,0, canvas.width, canvas.height);
}

function drawPlayer(){
    ctx.beginPath();
    
    ctx.arc(PLAYER.position.x, PLAYER.position.y, PLAYER.radius, 2 * Math.PI, false);
    ctx.fillStyle = PLAYER.color;
    ctx.fill();
    
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#000000';
    ctx.stroke();
}

function gameLoop(timestamp){

    secondsPassed = (timestamp - oldTimeStamp) / 1000;
    secondsPassed = Math.min(secondsPassed, 0.1);
    oldTimeStamp = timestamp;

    clearCanvas();
    drawCall();
    CONTROLLER.act();
    drawFPS();

    window.requestAnimationFrame(gameLoop)
}

function drawFPS(){
    FPS = Math.round(1 / secondsPassed)
    ctx.font = '18px Verdana';
    ctx.fillStyle = 'white'
    ctx.fillText(`FPS: ${FPS}`, 20, 20)
}

function drawCall(){
    drawBackground();
    drawPlayer();
}

function clearCanvas(){
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}


function onMousePress(event){
    
    event.preventDefault();
    
    if(event.target.id === 'main'){
        switch(event.button){
        
        case 0: console.log(`Left: X: ${event.clientX}| Y: ${event.clientY}`)
            break;
        case 1: console.log(`Right: X: ${event.clientX}| Y: ${event.clientY}`)
            break;
    }

    }
}


function HandleKey(event){

    const type = event.type;
    const key = event.code;
    const action = keyCodes[key];

    if(action){
        if(action.startsWith('move')){
            CONTROLLER.isMoving = (type === 'keydown');
            switch(action){
                        case 'move_left': {
                            CONTROLLER.left = CONTROLLER.isMoving
                        } break;
                        case 'move_right': {
                            CONTROLLER.right = CONTROLLER.isMoving
                        } break;
                        case 'move_up': {
                            CONTROLLER.up = CONTROLLER.isMoving
                        } break;
                        case 'move_down': {
                            CONTROLLER.down = CONTROLLER.isMoving
                        } break;
                        default: console.log(`action ${action} is not specified`)
                    }
        }
    }
}

document.addEventListener('keyup', HandleKey)
document.addEventListener('keydown', HandleKey)
document.addEventListener('mousedown', (event) => onMousePress(event))

window.requestAnimationFrame(gameLoop)