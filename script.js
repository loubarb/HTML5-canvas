const canvas = document.querySelector("#draw");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = "#BADA55";
ctx.lineJoin = "round";
ctx.lineCap = "square";
ctx.lineWidth = 100;

// allows blending
// ctx.globalCompositeOperation = 'multiply' 

let isDrawing = false;
// where line begins and where line ends
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

// function that fires when user is drawaing
function draw (e) {
  if (!isDrawing) return; // don't run if there is no mousedown movement
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  // following 3 lines start the line draw
  ctx.beginPath(); // intitiates path
  ctx.moveTo(lastX, lastY); // start from
  ctx.lineTo(e.offsetX, e.offsetY); // go to
  // stroke makes it appear on page
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY]; // updates to where user last left off
  hue++; // increments hue by 1 as user draws
  // resets hue
  if (hue > 360) {
    hue = 0;
  }
  // flips direction of brush width at 100 or at 1
  if (ctx.lineWidth >= 150 || ctx.lineWidth <= 10) {
    direction = !direction; 
  }
  // depending on direction, either increment or decrement line width
  if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
}

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true; // draws when mouse is clicked down
  [lastX, lastY] = [e.offsetX, e.offsetY]; // updates to where user last left off BEFORE mouse move & prevents starting at 0, 0
});

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => isDrawing = false); // stops when user lets go of mouse button
canvas.addEventListener("mouseout", () => isDrawing = false); // stops if user leaves canvas window
