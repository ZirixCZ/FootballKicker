/**
 * Using renderer to manipulate the DOM and draw stuff onto canvas.
 * DOM manipulation cannot be done inside the main process (located in index.js)
 */

let ctx = document.getElementById("canvas").getContext("2d");

const values = {
    linePosition_x: 0,
    movementDirection: 0,
    speedMultiplier: 5,
    lineSize: 500
}

// After the app has finished loading, get into a recursive function
window.onload = () => {
    requestAnimationFrame(update);
}

// Draws background of the context
function drawCtx(ctx, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
}

// Draws a moving line
function drawLine(ctx, linePosition_x, direction) {
    direction *= values.speedMultiplier;

    linePosition_x = linePosition_x + direction;
    if (linePosition_x >= 0 && linePosition_x <= window.outerWidth-values.lineSize)
        values.linePosition_x = linePosition_x;

    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.moveTo(linePosition_x, window.innerHeight-window.innerHeight/8);
    ctx.lineTo(values.lineSize+linePosition_x, window.innerHeight-window.innerHeight/8);
    ctx.stroke();
}

function update() {
    if (!ctx.canvas) return;

    document.onkeydown = (e) => {
        values.movementDirection = e.key === "d" ? 1 : e.key === "a" ? -1 : 0;
    }


    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    drawCtx(ctx, "#112");
    drawLine(ctx, values.linePosition_x, values.movementDirection);

    setTimeout(() => {
        requestAnimationFrame(update);
    }, 1000 / 60);
}
