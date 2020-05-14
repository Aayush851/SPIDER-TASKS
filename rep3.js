var canvas = document.getElementById("can");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var start = document.getElementById('start');
var c = canvas.getContext('2d');
var demo = document.getElementById('demo');
var store = document.getElementById('storage');
var exc = document.getElementsByClassName("excess");
var restart = document.getElementById("restart");
var fdisp = document.getElementById("fdisp");
var final = document.getElementById("final");

//var mouse = {
// y= undefined;
// x= undefined
//}
var circles = [];
var time = 0;
function timer() {


    if (circles.length > 50) {
        start.innerHTML = "Time UP";


    }
    else {
        time = time + 0.001;
        start.innerHTML = time.toFixed(3) + "s";
    }

}
restart.addEventListener('click', function () {
    document.location.reload();
})

var sel = {
    x: undefined, y: undefined
}


window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    exc.width = window.innerWidth;
    exc.height = window.innerHeight;

})

function getDistance(x3, y3, x2, y2) {
    let xDistance = x2 - x3;
    let yDistance = y2 - y3;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
}
//function rotate(velocity,angle){
  //  const v1x=velocity.x*cos(angle)+velocity.y*sin(angle);
   // const v1y=-velocity.x*sin(angle)+velocity.y*cos(angle);
    
//}
//function resolvecollision(particle,otherparticle){
  //  const u1=particle.velocity;
   // const u2=otherparticle.velocity;
//}
var maxradius = 40; var minradius = 10; var zeroradius = 0;
var colorarray = [
    '#EF3E5B', '#F26279', '#4B256D', '#6F5495', '#9957CD', 'orange', '#B07CDA', '#D1B2EA', '#3BC6B6'];




 canvas.addEventListener('click', function (event) {
    sel.x = event.clientX;
    sel.y = event.clientY;
})

var score=0;



function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minradius = radius;
    this.status=1;
    this.color = colorarray[Math.floor(Math.random() * colorarray.length)];
  
    this.update = function () {

        this.draw();
        

        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx; this.y += this.dy;

        //interactivity:
        // if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
        //  if (this.radius < maxradius) {
        // this.radius += 1;
        //  }
        //  }
        //  else if (this.radius > this.minradius) {
        //  this.radius -= 1;
        //  }
        // if (sel.x - this.x < this.radius && sel.x - this.x >= -this.radius && sel.y - this.y <= this.radius &&
        //     sel.y - this.y >= -this.radius) {
        //    this.radius = zeroradius;
        //  }
        if (getDistance(sel.x, sel.y, this.x, this.y) - this.radius*2 < 0) {
    
            this.radius=0;
            
            
        }


    }
      this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        c.fillStyle = this.color;
        c.fill();

    }
}





var tally = 0; var counter = 0;
function generate() {

    for (var i = 0; i < 4; i++) {
        var rad = 15 + Math.random() * (40 - 15);
        var x = Math.random() * (innerWidth - rad * 2) + rad;
        var y = Math.random() * (innerHeight - rad * 2) + rad;

        var dx = (Math.random() - 0.5) * 0.25;
        var dy = (Math.random() - 0.5) * 0.25;

        circles.push(new Circle(x, y, dx, dy, rad))

    }



    for (var k = 0; k < circles.length; k++) {

        if (circles[k].radius == 0) {
            tally = tally + 1;
            circles.splice(k, 1);
            //if (time * 1.125 > 1) {
                store.innerHTML = (tally*0.05).toFixed(0);
           // }
        }
    }
        
    
    if (circles.length > 50) {
        //if (item.target.className == 'btn' && item.target.textContent == maxi) {

        // array.push((c.toFixed(3)));
        // array.sort();
        // storage.innerHTML += (":" + array[0] + "s");
        // }


        // clearInterval(mytime);
        canvas.style.opacity = 0;

        fdisp.style.opacity = 1;
        fdisp.style.zIndex = 20;
        final.innerHTML = "High score" + " " + (tally * 0.05).toFixed(0);






    }

    animate()
}


console.log(circles);
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < circles.length; i++) {

        circles[i].update();
    }
}
start.addEventListener('click', function () {
    mytimer = setInterval(generate, 2000);
})




