class Bullet{

    constructor(context, x, y, angle, speed){
        
        this.moveAngle = angle;
        this.ctx = context;
        this.speed = speed;
        this.x = x;
        this.y = y;
        this.isAboutToDie = false;
    }


    do(){
         this.x += 5;
         this.y += 5;
        
        this.draw();
        this.isAboutToDie = this.isOutOfCanvas();
        //also add collision later
    }

    isOutOfCanvas(){
        if(this.x > this.ctx.canvas.clientWidth || 
            this.x < 0 ||
            this.y > this.ctx.canvas.clientHeight ||
            this.y < 0){
                return true;
            }
        return false;
    }

    draw(){
        ctx.fillStyle = 'blue'
        ctx.fillRect(this.x, this.y, 10, 10);
    }
}