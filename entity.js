class Entity {

    position
    speed
    radius
    fillColor
    isReadyToShoot
    shootDelayMs
    controller
    bullets

    constructor(controller){
        this.controller = controller;
    }

    draw(){    
        
        // Draw Player
        this.controller.ctx.beginPath();
        this.controller.ctx.arc(this.position.x, this.position.y, this.radius, 2 * Math.PI, false);
        this.controller.ctx.fillStyle = this.fillColor;
        this.controller.ctx.fill();
        this.controller.ctx.lineWidth = 3;
        this.controller.ctx.strokeStyle = '#000000';
        this.controller.ctx.stroke();

        // Also draw bullets

        if(this.bullets.length > 0){
            this.processBullets();
        }
    }

    processBullets(){
        {
            for(let bullet of this.bullets){
                bullet.do();
            }
            for(let i = this.bullets.length - 1; i >= 0; i--){
                if(this.bullets[i].isAboutToDie === true){
                    const index = this.bullets.indexOf(this.bullets[i]);
                    if(index > -1){
                        this.bullets.splice(index, 1)
                    }
                }
            }
        }
    }

}