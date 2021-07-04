class Enemy extends Entity{
    constructor
    (
        ctx,
        position,
        speed,
        radius,
        fillColor,
        target
    )
    {
        super(undefined)
        this.ctx = ctx;
        this.position = position;
        this.speed = speed;
        this.radius = radius;
        this.fillColor = fillColor;
        this.target = target;

        this.bullets = [];
        this.isReadyToShoot = true;
        this.shootDelayMs = 1000;

        this.shoot();
    }

    moveTowardsTarget(){
        if(!this.target)
            return

        let deltaX = this.position.x - this.target.position.x;
        let deltaY = this.position.y - this.target.position.y;

        let rotation = (Math.atan2(deltaY, deltaX)) * 180 / Math.PI
        let radians = (2 * Math.PI / 360) * (rotation - 180) * -1;

        this.position.x += this.speed * Math.cos(radians);
        this.position.y += this.speed * (-Math.sin(radians));

    }

    draw(){
        this.ctx.beginPath();
        this.ctx.arc(this.position.x, this.position.y, this.radius, 2 * Math.PI, false);
        this.ctx.fillStyle = this.fillColor;
        this.ctx.fill();
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = '#000000';
        this.ctx.stroke();

        // Also draw bullets

        if(this.bullets.length > 0){
            this.processBullets();
        }
    }

    shoot(){

        setTimeout(() => {
            this.shoot();
        }, this.shootDelayMs)

        let deltaX = this.position.x - this.target.position.x;
        let deltaY = this.position.y - this.target.position.y;

        let rotation = (Math.atan2(deltaY, deltaX)) * 180 / Math.PI
        let radians = (2 * Math.PI / 360) * (rotation - 180) * -1;

        let bullet = new EnemyBullet(this.ctx,
            {x: this.position.x - (10/ 2), y: this.position.y - (10 / 2)},
            radians, this
        );
        
        this.bullets.push(bullet);
    }

    processBullets(){
        for(let bullet of this.bullets){
            bullet.do();
        }
        // for(let i = this.bullets.length - 1; i >= 0; i--){
        //     this.bullets[i].do();
        //     if(this.bullets[i].dying === true){
        //         const index = this.bullets.indexOf(this.bullets[i]);
        //         if(index > -1){
        //             this.bullets.splice(index, 1);
        //             console.log(this.bullets.length)
        //         }
        //     }
        // }
    }

    act(){
        this.moveTowardsTarget();
    }
}



