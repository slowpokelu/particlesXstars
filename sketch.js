speedSeed = Math.floor(Math.random() * 3)
formSeed = Math.floor(Math.random() * 3)

// this class describes the properties of a single particle.
class Particle {
// setting the co-ordinates, radius and the
// speed of a particle in both the co-ordinates axes.
  constructor(){
    this.colorArray = [
      'red',
      'orange',
      'yellow',
      'lightgreen',
      'white',
      'lightblue',
    ]
    this.x = random(0,width);
    this.y = random(0,height);
    this.r = random(1,8);
    // this.xSpeed = random(-2,2);
    // this.ySpeed = random(-1,1.5);
    if (speedSeed == 0){
      this.xSpeed = random(-0.5,0.5);
      this.ySpeed = random(-0.5,0.5); 
    } else if (speedSeed == 1) {
      this.xSpeed = 0;
      this.ySpeed = random(-0.5, 0.5);
    } else if (speedSeed == 2){
      this.xSpeed = random(-0.5, 0.5);
      this.ySpeed = 0;
    }
    this.color = this.colorArray[Math.floor(Math.random() * this.colorArray.length)];
  }

// creation of a particle.
  createParticle() {
    noStroke();
    // fill('rgba(200,169,169,0.5)');
    fill(this.color)
    if (formSeed == 0) {
      circle(this.x,this.y,this.r);
    } else if (formSeed == 1) {
      square(this.x, this.y, this.r);
    } else if (formSeed == 2) {
      ellipse(this.x, this.y, this.r);
    }
  }

// setting the particle in motion.
  moveParticle() {
    if(this.x < 0 || this.x > width)
      this.xSpeed*=-1;
    if(this.y < 0 || this.y > height)
      this.ySpeed*=-1;
    this.x+=this.xSpeed;
    this.y+=this.ySpeed;
  }
}

// an array to add multiple particles
let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for(let i = 0;i<width/10;i++){
    particles.push(new Particle());
  }
}

function draw() {
  background('#0f0f0f');
  for(let i = 0;i<particles.length;i++) {
    particles[i].createParticle();
    particles[i].moveParticle();
    // particles[i].joinParticles(particles.slice(i));
  }
}