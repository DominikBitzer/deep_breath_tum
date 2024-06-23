const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const speedInput = document.getElementById('speed');

let number_of_sinuses = 5;
let speed = speedInput.value * number_of_sinuses * 2;
let vertical_stretch = canvas.height / 0.7;
//let horizontal_stretch = number_of_sinuses / canvas.width;
let redDotX = 0;
let startTime = null;
let frequency = 2 * Math.PI / window.innerWidth;  // Frequency adjusted to fit canvas width

function resizeCanvas() {
    canvas.width = window.innerWidth;
	frequency = 2 * Math.PI / window.innerWidth;  // Frequency adjusted to fit canvas width
    canvas.height = window.innerHeight;
}

function drawSinusCurve(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);

    for (let permanent_line_x = 0; permanent_line_x < canvas.width; permanent_line_x++) {
        const permanent_line_y = canvas.height / 2 + vertical_stretch * Math.sin(permanent_line_x * frequency * number_of_sinuses);
        ctx.lineTo(permanent_line_x, permanent_line_y);
    }

    ctx.strokeStyle = 'rgb(154, 188, 228)';
	ctx.lineWidth = 2;
    ctx.stroke();

    const dotRadius = 18;
	const cycleDuration = speed * 1000; // Convert speed from seconds to milliseconds
    const phase = (progress % cycleDuration) / cycleDuration; // Normalized phase in the range [0, 1]
    redDotX = phase * canvas.width;

    const redDotY = canvas.height / 2 + vertical_stretch * Math.sin(redDotX * frequency * number_of_sinuses);
    ctx.beginPath();
    ctx.arc(redDotX, redDotY, dotRadius, 0, Math.PI * 2);
	
	// Adding shading to the dot
	// const dotGradient = ctx.createRadialGradient(redDotX, redDotY, 0, redDotX, redDotY, dotRadius);
	// dotGradient.addColorStop(0, 'rgba(217, 81, 23, 1)');
	// dotGradient.addColorStop(1, 'rgba(217, 81, 23, 0.9)');

	ctx.shadowColor = 'rgba(255, 255, 255, 0.3)';
	ctx.shadowBlur = 20;
	ctx.shadowOffsetX = 3;
	ctx.shadowOffsetY = 3;
		
    // ctx.fillStyle = dotGradient;
    ctx.fillStyle = 'rgba(48, 112, 179, 1)';

    ctx.fill();

    requestAnimationFrame(drawSinusCurve);
}

speedInput.addEventListener('input', (event) => {
    speed = event.target.value * number_of_sinuses * 2;
});

window.addEventListener('resize', resizeCanvas);

resizeCanvas();
requestAnimationFrame(drawSinusCurve);
