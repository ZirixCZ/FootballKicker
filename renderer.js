/**
 * Using renderer to manipulate the DOM and draw stuff onto canvas.
 * DOM manipulation cannot be done inside the main process (located in index.js)
 */

let ctx = document.getElementById("canvas").getContext("2d");

const values = {
    score: 0,
    playerPosition_x: 0,
    movementDirection: 0,
    speedMultiplier: 25,
    bottomPlayerPadding: 8,
    playerHeight: 20,
    playerWidth: 700,
    arc_x: 900,
    arc_y: 100,
    arc_y_direction: 1,
    arc_x_direction: 1
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

// Draws a moving rectangle
function drawLine(ctx, linePosition_x, direction) {
    direction *= values.speedMultiplier;

    linePosition_x = linePosition_x + direction;
    if (linePosition_x >= 0 && linePosition_x <= window.outerWidth-values.playerWidth)
        values.playerPosition_x = linePosition_x;

    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.moveTo(linePosition_x, window.innerHeight-window.innerHeight/values.bottomPlayerPadding);
    ctx.rect(linePosition_x, window.innerHeight-window.innerHeight/values.bottomPlayerPadding, values.playerWidth, values.playerHeight);
    ctx.fillStyle = "white";
    ctx.fill();
}

function drawBall(ctx, y) {
    values.arc_y = y + (20*values.arc_y_direction);
    values.arc_x = values.arc_x + (5*values.arc_x_direction);
    ctx.beginPath();
    if (values.arc_y >= window.innerHeight-window.innerHeight/values.bottomPlayerPadding-values.playerHeight-25 && values.arc_y < window.innerHeight && values.arc_x >= values.playerPosition_x && values.arc_x <= values.playerPosition_x+values.playerWidth) {
        values.arc_y_direction *= -1;
        values.score++;
    }

    if (values.arc_y <= 0)
        values.arc_y_direction *= -1;
    if (values.arc_x <= 0 || values.arc_x >= window.innerWidth)
        values.arc_x_direction *= -1;

    ctx.arc(values.arc_x, values.arc_y, 50, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
}

function update() {
    if (!ctx.canvas) return;

    document.onkeydown = (e) =>
        values.movementDirection = e.key === "d" || e.key === "ArrowRight" ? 1 : e.key === "a" || e.key === "ArrowLeft" ? -1 : 0;

    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    drawCtx(ctx, "#112");
    drawBall(ctx, values.arc_y);
    drawLine(ctx, values.playerPosition_x, values.movementDirection);

    ctx.font = '48px serif';
    ctx.fillText('Me beloved game', window.innerWidth/2, window.innerHeight/2);
    ctx.font = '90px serif';
    ctx.fillText(values.score, window.innerWidth/2, window.innerHeight/2+150);

    setTimeout(() => {
        requestAnimationFrame(update);
    }, 1000 / 60);
}
