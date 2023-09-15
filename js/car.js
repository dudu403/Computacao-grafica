class Car {
    constructor(x, y, width, height, road) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.road = road; // Adicione a estrada como um argumento

        this.speed = 0;
        this.acceleration = 0.2;
        this.maxSpeed = 10;
        this.friction = 0.10;
        this.angle = 0;

        this.controls = new Controlador();

        // Rodas do carro
        this.wheelRadius = 10; // Tamanho das rodas (ajuste conforme necessário)
    }

    stayOnRoad() {
        const nextX = this.x - Math.sin(this.angle) * this.speed;
        const nextY = this.y - Math.cos(this.angle) * this.speed;

        if (this.road.isInside(nextX, nextY)) {
            this.x = nextX;
            this.y = nextY;
        } else {
            this.speed = 0;
        }
    }

    update() {
        if (this.controls.forward) {
            this.speed += this.acceleration;
        }
        if (this.controls.reverse) {
            this.speed -= this.acceleration;
        }

        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }
        if (this.speed < -this.maxSpeed / 2) {
            this.speed = -this.maxSpeed / 2;
        }

        if (this.speed > 0) {
            this.speed -= this.friction;
        }
        if (this.speed < 0) {
            this.speed += this.friction;
        }
        if (Math.abs(this.speed) < this.friction) {
            this.speed = 0;
        }

        if (this.speed !== 0) {
            const flip = this.speed > 0 ? 1 : -1;
            if (this.controls.left) {
                this.angle += 0.03 * flip;
            }
            if (this.controls.right) {
                this.angle -= 0.03 * flip;
            }
        }

        this.stayOnRoad();
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle);

       
        ctx.fillStyle = "red"; 
        ctx.fillRect(
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        );

        ctx.fillStyle = "white"; 

        ctx.beginPath();
        ctx.arc(-this.width / 2, this.height / 2, this.wheelRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.width / 2, this.height / 2, this.wheelRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(-this.width / 2, -this.height / 2, this.wheelRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.width / 2, -this.height / 2, this.wheelRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }
}
