/**
 * Using renderer to manipulate the DOM and draw stuff onto canvas.
 * DOM manipulation cannot be done inside the main process (located in index.js)
 */

let ctx = document.getElementById("canvas").getContext("2d");

// After app has finished loading, get into a recursive function
window.onload = () => {
    requestAnimationFrame(update);
}

// Draws background of the context
function drawCtx(ctx, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    console.log(window.innerWidth)
}

// Draws a moving line
function drawLine(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.moveTo(x_offset, 20);
    ctx.lineTo(200 + x_offset, 20);
    ctx.stroke();
}

let x_offset = 0;

function update() {
    if (!ctx.canvas) return;

    document.onkeydown = (e) => {
        console.log(e.key)
    }

    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    drawCtx(ctx, "#112");
    drawLine(ctx, x_offset);

    x_offset++;
    setTimeout(() => {
        requestAnimationFrame(update);
    }, 1000 / 60);
}
