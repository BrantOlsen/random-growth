
function drawTrees(context, x, y, yStep, xStep, lifeCounter) {
  var percentFromSides = .05;
  if (lifeCounter == 0 ||
      y < context.canvas.height*percentFromSides ||
      x < context.canvas.width*percentFromSides ||
      x > context.canvas.width*(1-percentFromSides))
  {
    return;
  }

  //console.log("x=" + x + ", y=" + y + ", ystep=" + yStep);
  context.beginPath();
  context.moveTo(x,y);
  y = y - yStep;
  x = x + xStep;
  //console.log("x=" + x + ", y=" + y + ", ystep=" + yStep);
  context.lineTo(x,y);
  context.stroke();

  drawTrees(context, x, y, yStep, xStep, lifeCounter);
  // This causes it to hang. Why?
  if (lifeCounter < 0)
  {
    drawTrees(context, x, y, yStep, -xStep, 1);
    drawTrees(context, x, y, yStep, xStep+xStep, 1);
  }
  else
  {
    --lifeCounter;
    drawTrees(context, x, y, yStep, -xStep, lifeCounter);
  }
}

var y = canvas.height;
var x = canvas.width / 2;
var yStep = Math.floor(y / 50);
if (yStep < 10)
{
  yStep = 10;
}
var xStep = Math.floor(x / 50);
if (xStep < 10)
{
  xStep = 10;
}
context.strokeStyle = "white";
console.log("x=" + x + ", y=" + y + ", ystep=" + yStep);
context.beginPath();
context.moveTo(x,y);
y = y - yStep * 10;
console.log("x=" + x + ", y=" + y + ", ystep=" + yStep);
context.lineTo(x,y);
context.stroke();

drawTrees(context, x, y, yStep, xStep, -1);
drawTrees(context, x, y, yStep, -xStep, -1);
