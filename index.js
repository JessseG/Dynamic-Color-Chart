let canvas = document.querySelector("canvas");
canvas.width = 1000;
canvas.height = 500;

let ctx = canvas.getContext("2d");

let data = {
  Australia: 1000,
  India: 2800,
  USA: 1200,
  China: 3600,
  Brasil: 2100,
};

const entries = Object.entries(data);

/*—————————————————————————————————————————————————————————————————————————*/

function drawGrids(e) {
  val = document.getElementById("slider").value;
  invertedValue = val / 4.5;
  // Color Filling
  if (e) {
    ctx.fillStyle =
      "rgb(" + e.target.value + "," + invertedValue + "," + (220 - val) + ")"; // onChange
    ctx.fillRect(0, 0, 1000, 500);
  } //
  else if (!e) {
    ctx.fillStyle =
      "rgb(" + val + "," + invertedValue + "," + (220 - val) + ")"; // onLoad
    ctx.fillRect(0, 0, 1000, 500);
  }

  drawGridlines();

  drawAxis();

  drawFunction();
}

/*—————————————————————————————————————————————————————————————————————————*/

function drawGridlines() {
  ctx.beginPath();
  ctx.strokeStyle = "blueviolet";

  let xGrid = 20;
  let yGrid = 20;
  let cellSize = 20;

  while (xGrid < canvas.height) {
    ctx.moveTo(0, xGrid);
    ctx.lineTo(canvas.width, xGrid);
    xGrid += cellSize;
  }

  while (yGrid < canvas.width) {
    ctx.moveTo(yGrid, 0);
    ctx.lineTo(yGrid, canvas.height);
    yGrid += cellSize;
  }
  //   ctx.closePath();

  ctx.stroke();
}

/*—————————————————————————————————————————————————————————————————————————*/
// —————(on-Load Background Color)

window.addEventListener("load", loadColor);

function loadColor() {
  let val = document.getElementById("slider").value;
  let invertedValue = val / 4.5;

  document.body.style.backgroundColor =
    "rgb(" + invertedValue + "," + val + ", 10)"; // flipped
}

/*——————————————————————————————————————————————————————————*/
// —————(on-Input Slider Event Listeners)

let slider = document.getElementById("slider");
slider.addEventListener("input", sliderColor);
slider.addEventListener("input", canvasColor);

/*——————————————————————————————————————————————————————————*/
// —————(Function: Change Canvas Color Style)

function canvasColor(e) {
  drawGrids(e);
}

/*——————————————————————————————————————————————————————————*/
// —————(Function: Change Background Color)

function sliderColor(e) {
  let invertedValue = e.target.value / 4.5;

  document.body.style.backgroundColor =
    "rgb(" + invertedValue + "," + e.target.value + ", 10)";
}

/*—————————————————————————————————————————————————————————————————————————*/

function blocks(count) {
  return count * 20;
}

/*—————————————————————————————————————————————————————————————————————————*/

function drawAxis() {
  /*————————————————————————————————————————*/
  /* Draws X and Y Axis */

  ctx.beginPath();
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2.5;

  ctx.moveTo(blocks(4), blocks(3));
  ctx.lineTo(blocks(4), blocks(22));
  ctx.lineTo(blocks(45), blocks(22));

  ctx.stroke();
  ctx.closePath();

  /*————————————————————————————————————————*/
  /* Draws Axis Descriptions */

  ctx.beginPath();
  ctx.lineWidth = 0.8;
  ctx.font = "15px Tahoma";
  ctx.moveTo(blocks(5), blocks(40));

  /*————————————————————————————————————————*/
  /* Draws Y Descriptions */

  let xPlot = 2;
  let yPlot = 22.2; // 22.2
  let plotValue = 0;

  for (let i = 1; i <= 10; i++) {
    ctx.fillStyle = "white";
    ctx.fillText(plotValue, blocks(xPlot), blocks(yPlot));
    yPlot -= 2; // Increases up the y-axis
    plotValue += 400;
  }
  ctx.stroke();

  /*————————————————————————————————————————*/
  /* Draws X Descriptions */

  xPlot = 6;
  yPlot = 23;
  ctx.moveTo(blocks(4), blocks(40));

  for (const [key, value] of entries) {
    ctx.fillText(key, blocks(xPlot), blocks(yPlot));
    xPlot += 8; // Increases up the x-axis
  }
  ctx.stroke();
  ctx.closePath();
}

/*—————————————————————————————————————————————————————————————————————————*/

function drawFunction() {
  ctx.beginPath();
  ctx.strokeStyle = "white";
  ctx.lineWidth = 1.5;
  ctx.moveTo(blocks(4), blocks(22));

  let xPlot = 7;

  for (const [country, population] of entries) {
    let populationPerBlock = population / 200;
    ctx.lineTo(blocks(xPlot), blocks(23 - populationPerBlock));
    xPlot += 8;
  }
  ctx.stroke();

  xPlot = 7;

  for (const [country, population] of entries) {
    let populationPerBlock = population / 200;
    ctx.beginPath();
    ctx.arc(blocks(xPlot), blocks(23 - populationPerBlock), 5, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = "blue";
    ctx.stroke(); // changes between visible circle outline
    ctx.fill(); // switching these 2 first/next causes
    xPlot += 8;
  }
}

drawGrids();
