let sun;
let mercury;


function setup() {
	createCanvas(1000,750);
	sun = new Body(198.9, createVector(0, 0), createVector(0, 0));

	let r = random(sun.r, height/2);
	let theta = random(TWO_PI);
	let planetPos = createVector(r*cos(theta), r*sin(theta));

	mercury = new Body(10, planetPos, createVector(0, 0));
}

function draw() {
	translate(width/2, height/2);
	background(40);
	sun.show();
	mercury.show();
}

function Body(mass, pos, vel) {
	this.mass = mass;
	this.pos = pos;
	this.vel = vel;
	this.r = this.mass;

	this.show = function() {
		noStroke(); fill(255);
		ellipse(this.pos.x, this.pos.y, this.r, this.r)
	}
}
