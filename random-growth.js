
function RandomGrowth(context, settings)
{
  this.settings = settings || {};
  this.settings.spawnRate = this.settings.spawnRate || .05;
  this.settings.spawnLife = this.settings.spawnLife || 10;
  
  this.context = context;
  this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
 
  var y = this.context.canvas.height;
  var x = this.context.canvas.width / 2;
  var trunkHeight = this.context.canvas.height * .1;
  
  var yStep = Math.floor(y / 25);
  if (yStep < 5)
  {
    yStep = 5;
  }
  var xStep = Math.floor(x / 50);
  if (xStep < 5)
  {
    xStep = 5;
  }

context.strokeStyle = "white";  
  
  var type = "DrawTrdee";
  
  if (type === "DrawTree")
  {
    console.log("x=" + x + ", y=" + y + ", ystep=" + yStep);
    context.beginPath();
    context.moveTo(x,y);
    y = y - trunkHeight;
    console.log("x=" + x + ", y=" + y + ", ystep=" + yStep);
    context.lineTo(x,y);
    context.stroke();

    this.drawBranch(context, x, y, yStep, xStep, -1);
    this.drawBranch(context, x, y, yStep, -xStep, -1);
  }
  else
  {
    this.drawRandom(context, 
                    this.context.canvas.width / 2, 
                    this.context.canvas.height / 2,
                    10, 
                    10, 
                    -1);
    this.drawRandom(context, 
                    this.context.canvas.width / 2, 
                    this.context.canvas.height / 2,
                    -10, 
                    -10,
                    -1);                
  }
}

RandomGrowth.prototype.drawRandom = function(context, x, y, yStep, xStep, lifeCounter)
{
  var percentFromSides = .05;
  if (lifeCounter == 0 ||
      y < context.canvas.height*percentFromSides ||
      x < context.canvas.width*percentFromSides ||
      x > context.canvas.width*(1-percentFromSides) ||
      xStep == 0 ||
      yStep == 0)
  {
    return;
  }
  --lifeCounter;
  var self = this;
  
  context.beginPath();
  context.moveTo(x,y);
  y = y - yStep;
  x = x + xStep;
  context.lineTo(x,y);
  context.stroke();
  
  setTimeout(function() {
    var minX = (xStep < 0 ? -5 : 0.1);
    var maxX = (xStep < 0 ? -0.1 : 5);
    self.drawRandom(context, x, y, self.getRandom(-10, 10), self.getRandom(minX, maxX), lifeCounter);
    if (self.getRandom(0, 1) < self.settings.spawnRate)
    {
      self.drawRandom(context, x, y, self.getRandom(-20, 20), self.getRandom(-5, 5), self.settings.spawnLife);    
    }
  }, 200);
}

RandomGrowth.prototype.drawBranch = function(context, x, y, yStep, xStep, lifeCounter) 
{
  var self = this;
  var percentFromSides = .05;
  if (lifeCounter == 0 ||
      y < context.canvas.height*percentFromSides ||
      x < context.canvas.width*percentFromSides ||
      x > context.canvas.width*(1-percentFromSides) ||
      xStep == 0 ||
      yStep == 0)
  {
    return;
  }
 ++count;
  context.beginPath();
  context.moveTo(x,y);
  y = y - yStep;
  x = x + xStep;
  //console.log("x=" + x + ", y=" + y + ", ystep=" + yStep);
  context.lineTo(x,y);
  context.stroke();

  setTimeout(function() {
    self.drawBranch(context, x, y, yStep, xStep, lifeCounter);
  }, 100);
  // This causes it to hang. Why?
  if (lifeCounter < 0)
  {
    setTimeout(function() {
      self.drawBranch(context, x, y, yStep, xStep+xStep, -1);
    }, 10);
  }
  else
  {
    --lifeCounter;
    self.drawBranch(context, x, y, yStep, -xStep, lifeCounter);
  }
}

RandomGrowth.prototype.getRandom = function(min, max)
{
  return Math.random() * (max - min) + min;   
}