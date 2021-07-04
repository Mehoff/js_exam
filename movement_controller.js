class MovementController{

    constructor(ctx){
        this.ctx = ctx;

        this.isMoving = false;
        this.isRunning = false;
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
        this.degress = 0;
        this.entity = undefined
        
        this.mouse = {
            left: false,
            right: false,
            position: {x: 0, y: 0}
        }
    
    }


    // setEntity(entity){
    //     this.entity = entity
    // }

    setMousePosition(x, y){
        this.mouse.position.x = x;
        this.mouse.position.y = y;
    }

    act(entity){


        if(this.up){
            entity.position.y -= this.isRunning === true ? ((entity.speed * 2) * secondsPassed) : (entity.speed * secondsPassed)
        }
        if(this.down){
            entity.position.y += this.isRunning === true ? ((entity.speed * 2) * secondsPassed) : (entity.speed * secondsPassed)
        }
        if(this.left){
            entity.position.x -= this.isRunning === true ? ((entity.speed * 2) * secondsPassed) : (entity.speed * secondsPassed);
        }
        if(this.right){
            entity.position.x += this.isRunning === true ? ((entity.speed * 2) * secondsPassed) : (entity.speed * secondsPassed);
        }

    }

    handleKey(event){

        const type = event.type;
        const key = event.code;
        const action = keyCodes[key];
    
        if(action){
            //Зачем я это написал, дичь какая-то...
            //this.isMoving = (type === 'keydown');

            // Возможно переделать все экшены связанные с движенем под этот шаблон:

            if(action === 'run'){
                if(type === 'keydown'){
                    this.isRunning = true
                }
                if(type === 'keyup'){
                    this.isRunning = false
                }
            }

            //this.isRunning = (action === 'run' && type === 'keydown')

            if(action.startsWith('move')){
            
                this.isMoving = (type === 'keydown')
                switch(action){
                    case 'move_left': {
                        this.left = this.isMoving
                    } break;
                    case 'move_right': {
                        this.right = this.isMoving
                    } break;
                    case 'move_up': {
                        this.up = this.isMoving
                    } break;
                    case 'move_down': {
                        this.down = this.isMoving
                    } break;
    
                    default: console.log(`action ${action} is not specified`)
                }
            }
            
        }
    }



}