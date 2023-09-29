const canvas = document.getElementById('myCanvas');
canvas.width = 200;

const ctx = canvas.getContext('2d');
const road = new Road(canvas.width / 2, canvas.width * 0.9);
const car = new Car(road.getLaneCenter(1), 100, 30, 50, road);

let zoomLevel = 0.5; // 
const zoomIncrement = 0.1; // 

canvas.addEventListener('wheel', handleMouseWheel);

function handleMouseWheel(event) {
    const zoomFactor = event.deltaY > 0 ? 1 + zoomIncrement : 1 - zoomIncrement;
    zoomLevel *= zoomFactor;

    zoomLevel = Math.max(0.1, Math.min(zoomLevel, 5.0));

    redrawWithZoom();
}

function redrawWithZoom() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();

    const canvasCenterX = canvas.width / 2;
    const canvasCenterY = canvas.height / 2;

    const translatedCarX = canvasCenterX - (car.x - canvasCenterX) * zoomLevel;
    const translatedCarY = canvasCenterY - (car.y - canvasCenterY) * zoomLevel;

    ctx.translate(translatedCarX, translatedCarY);
    ctx.scale(zoomLevel, zoomLevel);
    road.draw(ctx);
    car.draw(ctx);

    ctx.restore();
}

function animate() {
    car.update();
    canvas.height = window.innerHeight;

    ctx.save();
    redrawWithZoom();
    ctx.restore();

    requestAnimationFrame(animate);
}

redrawWithZoom();

animate();
