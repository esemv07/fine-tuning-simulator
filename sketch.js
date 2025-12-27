let sun;
let mercury;
let G = (4.03 * Math.pow(10, -5)); // 1 second = 1 week


function setup() {
	createCanvas((windowWidth-400), (windowHeight-25));
	sun = new Body(333000, createVector(0, 0), createVector(0, 0), 139.268);


	mercury = new Body(0.0553, planetPos(100), planetVel(planetPos(100)), 4.8794);

	venus = new Body(0.815, planetPos(175), planetVel(planetPos(175)), 12.1036);
}

function planetPos(r) {
	let theta = 0;
	return createVector(r*cos(theta), r*sin(theta));
}

function planetVel(planetPos) {
	let planetVel = planetPos.copy();
	planetVel.rotate(HALF_PI);
	planetVel.setMag( sqrt( G * sun.mass / planetPos.mag() ) )
	return planetVel;
}

function draw() {
	translate(width/2, height/2);
	background(40);
	sun.attract(mercury);
	mercury.update();
	mercury.show();
	sun.attract(venus);
	venus.update();
	venus.show();
	sun.show();
}

function Body(mass, pos, vel, radius) {
	this.mass = mass;
	this.pos = pos;
	this.vel = vel;
	this.r = radius;

	this.show = function() {
		noStroke(); fill(255);
		ellipse(this.pos.x, this.pos.y, this.r, this.r);
	}

	this.update = function() {
		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;
	}

	this.applyForce = function(f) {
		this.vel.x += f.x / this.mass;
		this.vel.y += f.y / this.mass;
	}

	this.attract = function(child) {
		let r = dist(this.pos.x, this.pos.y, child.pos.x, child.pos.y);
		let f = this.pos.copy().sub(child.pos);
		f.setMag( (G * this.mass * child.mass) / (Math.pow(r, 2)) )
		child.applyForce(f);
	}
}
