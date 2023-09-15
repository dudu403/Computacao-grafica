class Tree {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 20; 
        this.height = 40; 
    }

    draw(ctx) {
        
        ctx.fillStyle = "green";
        ctx.fillRect(this.x - this.width / 2, this.y - this.height, this.width, this.height);
    }
}
