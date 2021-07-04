class EnemyMovementController{
    constructor(ctx){
        this.ctx = ctx
    }

    moveTowardsTarget(entity){
        // get target position
        // move to target
        
        let deltaX = this.position.x - entity.position.x;
        let deltaY = this.position.y - entity.position.y;

        let rotation = (Math.atan2(deltaY, deltaX)) * 180 / Math.PI
        let radians = (2 * Math.PI / 360) * (rotation - 180) * -1;

        entity.position.x += entity.speed * Math.cos(radians);
        entity.position.y += entity.speed * (-Math.sin(radians));

    }

    tryShoot(){
        //
    }

    act(entity){
        this.tryShoot()
        this.moveTowardsTarget(entity);
    }
}