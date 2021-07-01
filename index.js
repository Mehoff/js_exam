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
const mainPlayer = new Player(100, 100, 30, 'red', controller)


// let PLAYER = {
//     position: {
//         x : 100,
//         y : 100
//     },
//     speed: 50,
//     runSpeed: 100,
//     radius: 30,
//     strokeWidth: 3,
//     color: '#ffb6c1',
//     stroke: 'black',


//     // Use Later
//     isReadyToShoot: true,
//     shootDelayMs: 100,
//     bulletWidth: 5,
//     bulletHeight: 10,
//     bulletSpeed: 10,

//     bullets: [],

//     shoot(canvasX, canvasY){
//         // SetTimeOut on shootDelay
        
//         let deltaX = PLAYER.position.x - canvasX;
//         let deltaY = PLAYER.position.y - canvasY;

//         let rotation = (Math.atan2(deltaY, deltaX)) * 180 / Math.PI
//         let radians = (2 * Math.PI / 360) * (rotation - 180) * -1;
        
//         let bullet = new Bullet(ctx, this.position.x - (this.bulletWidth / 2), this.position.y - (this.bulletHeight / 2), this.bulletWidth, this.bulletheight, radians, this.bulletSpeed)
//         this.bullets.push(bullet);
//     },

//     processBullets(){
//         for(let bullet of this.bullets){
//             bullet.do();
//         }
//         for(let i = this.bullets.length - 1; i >= 0; i--){
//             if(this.bullets[i].isAboutToDie === true){
//                 const index = this.bullets.indexOf(this.bullets[i]);
//                 if(index > -1){
//                     this.bullets.splice(index, 1)
//                     console.log('bullet dead')
//                 }
//             }
//         }
//     }
// }

// let CONTROLLER = {

//     isMoving: false,
//     isRunning: false,
//     up: false,
//     down: false,
//     left: false,
//     right: false,

//     mouse: {
//         left : false,
//         right : false,
//         position: {
//             x : 0,
//             y : 0
//         }
//     },

//     degrees : 0,

//     act(){
//         if(this.up){
//             PLAYER.position.y -= this.isRunning === true ? (PLAYER.runSpeed * secondsPassed) : (PLAYER.speed * secondsPassed) 
//         }
//         if(this.down){
//             PLAYER.position.y += this.isRunning === true ? (PLAYER.runSpeed * secondsPassed) : (PLAYER.speed * secondsPassed) 
//         }
//         if(this.left){
//             PLAYER.position.x -= this.isRunning === true ? (PLAYER.runSpeed * secondsPassed) : (PLAYER.speed * secondsPassed);
//         }
//         if(this.right){
//             PLAYER.position.x += this.isRunning === true ? (PLAYER.runSpeed * secondsPassed) : (PLAYER.speed * secondsPassed);
//         }

//         PLAYER.processBullets()
//     },
//     setMousePosition(x, y){
//         this.mouse.position.x = x;
//         this.mouse.position.y = y
//     }
// }

// let ENEMY = {
//     position: {
//         x : 0,
//         y : 0
//     },
//     speed: 50,
//     radius: 50,
//     color: 'red',
//     stroke: 'black'
// }

const CENTER_X = ctx.width / 2;
const CENTER_Y = ctx.height / 2;

function drawBackground(){
    ctx.fillStyle = 'green'
    ctx.fillRect(0,0, canvas.width, canvas.height);
}

function drawPlayer(){
    mainPlayer.draw();
    mainPlayer.act();
}

function gameLoop(timestamp){

    secondsPassed = (timestamp - oldTimeStamp) / 1000;
    secondsPassed = Math.min(secondsPassed, 0.1);
    oldTimeStamp = timestamp;

    clearCanvas();
    drawCall();
    //mainPlayer.controller.act();
    drawFPS();

    // SPOT FOR DEBUGGING
    // ========
    
    // ========

    window.requestAnimationFrame(gameLoop)
}

function drawFPS(){
    FPS = Math.round(1 / secondsPassed)
    ctx.font = '22px Verdana';
    ctx.fillStyle = 'white'
    ctx.fillText(`FPS: ${FPS}`, 20, 20)
}

function drawCall(){

    clearCanvas();
    drawBackground();
    drawPlayer();



    // ctx.beginPath();
    // ctx.moveTo(mainPlayer.position.x, mainPlayer.position.y);

    // ctx.lineWidth = 10;
    // ctx.strokeStyle = 'red'
    // ctx.stroke();
}

function clearCanvas(){
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function onMousePress(event){
    
    event.preventDefault();
    //mainPlayer.movementController.setMousePosition(canvas, event)
    mainPlayer.shoot()
}

// function HandleKey(event){

//     const type = event.type;
//     const key = event.code;
//     const action = keyCodes[key];

//     if(action){

// //        CONTROLLER.isRunning = (action === 'ShiftLeft');

//         console.log(CONTROLLER.isRunning)

//         if(action.startsWith('move')){
//             CONTROLLER.isMoving = (type === 'keydown');
//             switch(action){
//                         case 'move_left': {
//                             CONTROLLER.left = CONTROLLER.isMoving
//                         } break;
//                         case 'move_right': {
//                             CONTROLLER.right = CONTROLLER.isMoving
//                         } break;
//                         case 'move_up': {
//                             CONTROLLER.up = CONTROLLER.isMoving
//                         } break;
//                         case 'move_down': {
//                             CONTROLLER.down = CONTROLLER.isMoving
//                         } break;
//                         default: console.log(`action ${action} is not specified`)
//                 }
//         }
//     }
// }

function HandleMouseMove(event){
    // if(event.target.id === 'main'){
    //     CONTROLLER.setMousePosition(event.pageX, event.pageY)
    // }

    if(event.target.id === 'main'){
        // Test if pageX and pageY is correct
        mainPlayer.controller.setMousePosition(canvas, event.pageX, event.pageY);
    }
}

document.addEventListener('keyup', mainPlayer.controller.handleKey)
document.addEventListener('keydown', mainPlayer.controller.handleKey)
document.addEventListener('mousedown', (event) => onMousePress(event))
document.addEventListener('mousemove', HandleMouseMove);

window.requestAnimationFrame(gameLoop)