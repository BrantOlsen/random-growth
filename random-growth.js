
function RandomGrowth(context, settings)
{
  this.context = context;
  this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  var y = this.context.canvas.height;
  var x = this.context.canvas.width / 2;
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

  this.drawBranch(context, x, y, yStep, xStep, -1);
  this.drawBranch(context, x, y, yStep, -xStep, -1);
}

RandomGrowth.prototype.drawBranch = function(context, x, y, yStep, xStep, lifeCounter) 
{
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

  this.drawBranch(context, x, y, yStep, xStep, lifeCounter);
  // This causes it to hang. Why?
  if (lifeCounter < 0)
  {
    this.drawBranch(context, x, y, yStep, -xStep, 1);
    this.drawBranch(context, x, y, yStep, xStep+xStep, 1);
  }
  else
  {
    --lifeCounter;
    this.drawBranch(context, x, y, yStep, -xStep, lifeCounter);
  }
}


