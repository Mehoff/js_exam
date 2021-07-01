class Player extends Entity{
    constructor(
        position,
        speed,
        radius,
        fillColor,
        movementController
    ){
        super(movementController);
        this.position = position;
        this.speed = speed;
        this.radius = radius;
        this.fillColor = fillColor;

        this.bullets = [];
        this.isReadyToShoot = true;
        this.shootDelayMs = 100; 
    }

    shoot(){

        let deltaX = this.position.x - this.controller.mouse.position.x;
        let deltaY = this.position.y - this.controller.mouse.position.y;

        let rotation = (Math.atan2(deltaY, deltaX)) * 180 / Math.PI
        let radians = (2 * Math.PI / 360) * (rotation - 180) * -1;

        let bullet = new PlayerBullet(this.controller.ctx,
            this.position.x - (10 / 2),
            this.position.y - (10 / 2),
            radians
        );
        
        this.bullets.push(bullet);
    }

    act(){
        this.controller.act(this);
    }
}