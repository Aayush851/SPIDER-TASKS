var canvas = document.getElementById("can");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var maxrad=50;


var ctx = canvas.getContext('2d');

var mouse = {
    x: undefined,
    y: undefined
}
canvas.addEventListener("mousemove", updates);



function updates(e) {
    mouse.x = e.x;
    mouse.y = e.y;

}

function Circle(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    this.minradius=radius;
    this.draw = function () {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.closePath();
    }
    this.update = function () {

        this.draw();
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
           if (this.radius<maxrad){
                this.radius+=1;

            }

          
            
           
        }
        else if(this.radius>this.minradius){
            this.radius-=1;
        }
        
       


        
    }

}
var colorarray = ["blue", "red", "yellow", "aqua"];

var circles = [];
for (var i = 0; i < 100; i++) {
    var radius = 10 + Math.random() * (40 - 10);
    var x = Math.random() * canvas.width + radius;
    var y = Math.random() * canvas.height + radius;
    var dx = Math.random() - 0.5;
    var dy = Math.random() - 0.5;
    var color = colorarray[Math.floor(Math.random() * colorarray.length)];
    circles.push(new Circle(x, y, dx, dy, radius, color))
}
function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < circles.length; i++) {
        circles[i].update();
    }
}
animate();