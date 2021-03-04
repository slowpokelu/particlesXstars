colored = false
seeded = false
paused = false


numAvailableSeeds = 5;

currentSeed = Math.floor(Math.random() * numAvailableSeeds)

class Particle {
  constructor(
   colormode=false, 
   useseed=false, 
   minsize=1,
   maxsize=8,
   seed=currentSeed
  ){
    this.cycle = 0;
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
    this.radius = random(minsize,maxsize);
    this.r = this.radius;
    this.xSpeed = random(-2,2);
    this.ySpeed = random(-1,1.5);
    this.color = 'white';
    if (colormode) {
      this.color = this.colorArray[Math.floor(Math.random() * this.colorArray.length)];
    }

    if (useseed) {
      switch (seed) {
        case 0:
          this.xSpeed = random(-10, 10);
          this.ySpeed = random(-10, 10);
          break;
        case 1: 
          this.xSpeed = random(-0.5, 0.5);
          this.ySpeed = 0;
          break;
        case 2:
          this.xSpeed = 0;
          this.ySpeed = random(0.1, 3);
          break;
        case 3:
          this.xSpeed = random(-0.5, 0.5);
          this.ySpeed = random(-1,1);
          break;
        case 4:
          this.xSpeed = random(-1,1);
          this.ySpeed = random(-0.5, 0.5);
          break;
        default:
          this.xSpeed = random(-1,1);
          this.ySpeed = random(-1,1);
      }
    }
    
  }
  
  fall(speed=3) {
    this.xSpeed = 0;
    this.ySpeed = speed;
  }
  
  defaultColor() {
    this.color = 'rgba(200,169,169,0.5)'
  }
  
  jiggle(min=-1, max=1) {
    this.xSpeed = random(min, max);
    this.ySpeed = random(min, max);
  }

  createParticle() {
    noStroke();
    fill(this.color)
    circle(this.x,this.y,this.r);
    
  }
  
  setRandomSpeed(speed=1) {
    this.xSpeed = random(-speed, speed);
    this.ySpeed = random(-speed, speed);
  }

  moveParticle() {
    if(this.x < 0 || this.x > width)
      this.xSpeed*=-1;
    if(this.y < 0 || this.y > height)
      this.ySpeed*=-1;
    this.x+=this.xSpeed;
    this.y+=this.ySpeed;
  }
  
  flickerParticle() {
    if (this.r <= 0) {
      this.cycle = 1;
    }
    if (this.r >= this.radius) {
      this.cycle = 0;
    }
    if (this.cycle == 0) {
      this.r-=0.1;
    }
    if (this.cycle ==1) {
      this.r+=0.1;
    }
  }
  
}

let particles = [];
let slider;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // numOfParticles = width/10;
  numOfParticles = 200;

  /*
  speedin = createElement('h2', 'Particle speed:');
  speedin.style('font-family', 'sans-serif')
  speedin.style('color', 'white');
  speedin.style('font-size', '20px');
  speedin.position(20, 5);
  */
  /*
  setParticleCount = createElement('h2', 'Particle count:');
  setParticleCount.style('font-family', 'sans-serif')
  setParticleCount.style('color', 'white');
  setParticleCount.style('font-size', '20px');
  setParticleCount.position(20, 5);
  */
  /*
  input = createInput();
  input.position(20, 55);

  button = createButton('GO!');
  button.style('background-color', 'white')
  button.position(input.x + input.width, 55);
  button.mousePressed(changeSpeed);
  */

  /*
  slider = createSlider(0, 10, 1);
  slider.position(20, 55);  
  */
  
  speedChange = createElement('h2', 'Speed');
  speedChange.style('color', 'white');
  speedChange.style('font-family', 'sans-serif')
  speedChange.style('font-size', '20px')
  speedChange.position(80, 27);
  delSpeed = createButton('-');
  delSpeed.position(20, 45);
  delSpeed.mousePressed(functionThatSlows);
  addSpeed = createButton('+');
  addSpeed.position(45, 45);
  addSpeed.mousePressed(functionThatSpeedsUp);
  
  enableColor = createElement('h2', 'Toggle Color');
  enableColor.style('color', 'white');
  enableColor.style('font-family', 'sans-serif')
  enableColor.style('font-size', '20px')
  enableColor.position(20, 70);
  colorCheck = createCheckbox('colored', false);
  colorCheck.position(20, 110);
  colorCheck.changed(functionThatAppliesOrRemovesColor);
  
  useSeed = createElement('h2', 'Random Seed');
  useSeed.style('color', 'white');
  useSeed.style('font-family', 'sans-serif')
  useSeed.style('font-size', '20px')
  useSeed.position(20, 125);
  seedCheck = createButton('randomize');
  seedCheck.position(20, 165);
  seedCheck.mousePressed(functionThatTogglesSeed);
  
  particleCounter = createElement('h2');
  particleCounter.style('color', 'white');
  particleCounter.style('font-family', 'sans-serif')
  particleCounter.style('font-size', '20px')
  particleCounter.position(20, 180);
  
  add10Particles = createElement('h2', '10 Particles');
  add10Particles.style('color', 'white');
  add10Particles.style('font-family', 'sans-serif')
  add10Particles.style('font-size', '20px')
  add10Particles.position(80, 207);
  del10Button = createButton('-');
  del10Button.position(20, 225);
  del10Button.mousePressed(functionThatRemoves10Particles);
  add10Button = createButton('+');
  add10Button.position(45, 225);
  add10Button.mousePressed(functionThatAdds10Particles);
  
  add100Particles = createElement('h2', '100 Particles');
  add100Particles.style('color', 'white');
  add100Particles.style('font-family', 'sans-serif')
  add100Particles.style('font-size', '20px')
  add100Particles.position(80, 234);
  del100Button = createButton('-');
  del100Button.position(20, 250);
  del100Button.mousePressed(functionThatRemoves100Particles);
  add100Button = createButton('+');
  add100Button.position(45, 250);
  add100Button.mousePressed(functionThatAdds100Particles);
  
  resetButton = createButton('RESET');
  resetButton.style('color', 'red');
  resetButton.position(20, 315);
  resetButton.mousePressed(createDefaultParticles);
  
  pauseButton = createButton('PAUSE');
  pauseButton.position(20, 285);
  pauseButton.mousePressed(pauseResume);

  createDefaultParticles();
  
}

function draw() {
  background('#0f0f0f');
  for(let i = 0;i<particles.length;i++) {
    p = particles[i];
    p.createParticle();
    p.moveParticle();
  }
  updateParticleCounter();
  checkIfPaused();
}

function createDefaultParticles() {
  particles = [];
  paused = false
  for(let i = 0;i<numOfParticles;i++){
    particles.push(new Particle(colored,seeded,1,8,currentSeed));
  }
}

function createSeededParticles() {
  seeded = true;
  particles = [];
  for(let i = 0;i<numOfParticles;i++){
    particles.push(new Particle(colored,seeded,1,8,currentSeed));
  }
}

function createColoredParticles() {
  particles = [];
  for(let i = 0;i<numOfParticles;i++){
    particles.push(new Particle(true,seeded,1,8,currentSeed));
  }
}

function checkIfPaused() {
  if (paused) {
    pauseButton.html('RESUME');
  } else {
    pauseButton.html('PAUSE');
  }
}

xSpeedArray = [];
ySpeedArray = [];

function pauseResume() {
  if (!paused) {
    // changeSpeed(0);
    for (let i=0;i<particles.length;i++) {
      p = particles[i];
      xSpeedArray.push(p.xSpeed);
      xSpeedArray.push(p.ySpeed);
      p.xSpeed = 0;
      p.ySpeed = 0;
    }
    paused = true;
    pauseButton.html('RESUME');
  } else {
    //changeSpeed(1);
    for (let i=0;i<particles.length;i++) {
      p = particles[i];
      p.xSpeed = xSpeedArray[i];
      p.ySpeed = xSpeedArray[i];
      p.moveParticle()
    }
    paused = false;
    pauseButton.html('PAUSE');
  }
}

function updateParticleCounter() {
  particleCounter.html('Particles: '+particles.length);
}

function mousePressed() {
  
}

function functionThatAppliesOrRemovesColor() {
  if (colored==true) {
    colored = false;
    for(let i = 0;i<particles.length;i++) {
      p = particles[i];
      p.color='white';
    }
  } else {
    colored = true;
    for(let i = 0;i<particles.length;i++) {
      p = particles[i];
      p.color = p.colorArray[Math.floor(Math.random() * p.colorArray.length)];
    }
  }
}

function functionThatTogglesSeed() {
  currentSeed = Math.floor(Math.random() * numAvailableSeeds)
  paused = false
  createSeededParticles();
}

function functionThatSlows() {
  for(let i = 0;i<particles.length;i++) {
    p = particles[i];
    if (p.xSpeed == 0 && p.ySpeed == 0) {
      continue;
    } else {
      if (p.xSpeed == 0) {
      
      } else {
        if (p.xSpeed<0) {
          p.xSpeed++;
        } else if (p.xSpeed>0) {
          p.xSpeed--;
        } 
      }
    if (p.ySpeed == 0) {
      
    } else {
      if (p.ySpeed<0) {
        p.xSpeed++;
      } else if (p.ySpeed>0) {
        p.xSpeed--;
      } 
    }
    }
  }
}

function functionThatSpeedsUp() {
  for(let i = 0;i<particles.length;i++) {
    p = particles[i];
    // p.setRandomSpeed();
    if (p.xSpeed<0) {
      p.xSpeed -= 1;
    } else if (p.xSpeed>0) {
      p.xSpeed += 1;
    } 
    if (p.ySpeed<0) {
      p.ySpeed -= 1;
    } else if (p.ySpeed>0) {
      p.ySpeed += 1;
    }
  }
}

function functionThatAdds10Particles() {
  for (let i = 0;i<10;i++){
    particles.push(new Particle(colored,seeded,1,8,currentSeed));
  }
}

function functionThatRemoves10Particles() {
  for (let i = 0;i<10;i++){
    particles.pop();
  }
}

function functionThatAdds100Particles() {
  for (let i = 0;i<100;i++){
    particles.push(new Particle(colored,seeded,1,8,currentSeed));
  }
}

function functionThatRemoves100Particles() {
  for (let i = 0;i<100;i++){
    particles.pop();
  }
}

function changeSpeed(value=1) {
  /*
  const speed = input.value();
  speedin.html('Speed was set to ' + speed + '!');
  input.value('');
  */
  for(let i = 0;i<particles.length;i++) {
    p = particles[i];
    p.setRandomSpeed(value);
  }
}