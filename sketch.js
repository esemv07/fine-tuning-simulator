let sun;
let mercury;
let G = (4.03 * Math.pow(10, -5)); // 1 second = 1 week
let zoom = 0.5;


function setup() {
	createCanvas((windowWidth-400), (windowHeight-25));
	sun = new Body(333000, createVector(0, 0), createVector(0, 0), 34.817, color(253, 204, 108));


	mercury = new Body(0.0553, planetPos(25), planetVel(planetPos(25)), 2.4397, color(183, 184, 185));

	venus = new Body(0.815, planetPos(43.75), planetVel(planetPos(43.75)), 6.0518, color(238 ,203, 139));

	earth = new Body(1, planetPos(62.5), planetVel(planetPos(62.5)), 6.371, color(40, 122, 184));

	mars = new Body(0.815, planetPos(93.75), planetVel(planetPos(93.75)), 3.3895, color(156, 46, 53));

	jupiter = new Body(317.8, planetPos(312.5), planetVel(planetPos(312.5)), 69.911, color(188, 175, 178));

	saturn = new Body(95.2, planetPos(593.75), planetVel(planetPos(593.75)), 58.232, color(164, 155, 114));

	uranus = new Body(14.5, planetPos(1187.5), planetVel(planetPos(1187.5)), 25.362, color(172, 229, 238));

	neptune = new Body(17.1, planetPos(1875), planetVel(planetPos(1875)), 24.622, color(75, 112, 221));
}

function draw() {
	translate(width/2, height/2);
	background(40);

	scale(zoom);

	sun.attract(mercury);
	mercury.update();
	mercury.show();
	
	sun.attract(venus);
	venus.update();
	venus.show();

	sun.attract(earth);
	earth.update();
	earth.show();

	sun.attract(mars);
	mars.update();
	mars.show();

	sun.attract(jupiter);
	jupiter.update();
	jupiter.show();

	sun.attract(saturn);
	saturn.update();
	saturn.show();

	sun.attract(uranus);
	uranus.update();
	uranus.show();

	sun.attract(neptune);
	neptune.update();
	neptune.show();

	sun.show();
}

function windowResized() {
	resizeCanvas((windowWidth-400), (windowHeight-25));
}

function mouseWheel(event) {
	if (event.delta > 0) {
		zoom += 0.05;
	} else if (event.delta < 0 && zoom >= 0.15) {
		zoom -= 0.05;
	}

	return false;
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

function Body(mass, pos, vel, radius, colour) {
	this.mass = mass;
	this.pos = pos;
	this.vel = vel;
	this.r = radius;
	this.c = colour;

	this.show = function() {
		noStroke(); fill(this.c);
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
