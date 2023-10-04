import * as p5 from "p5";

const spaceShip = () => {
  const p = new p5((sk) => {
    const r = 16;
    const damping = 0.99;
    const topspeed = 6;
    class SpaceShip {
      constructor(x, y, m) {
        this.pos = p.createVector(p.width / 2, p.height / 2);

        this.acc = p.createVector(0, 0);
        this.vel = p.createVector(0, 0);
        this.angle = 0;
      }
      applyForce(force) {
        this.acc.add(force);
      }
      turn(value) {
        this.angle += value;
      }
      edges() {
        let buffer = r * 2;
        if (this.pos.x > p.width + buffer) this.pos.x = -buffer;
        else if (this.pos.x < -buffer) this.pos.x = p.width + buffer;
        if (this.pos.y > p.height + buffer) this.pos.y = -buffer;
        else if (this.pos.y < -buffer) this.pos.y = p.height + buffer;
      }
      update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.vel.mult(damping);
        this.acc.set(0, 0);
      }

      pushing() {
        console.log("pushing");
        let newAngle = this.angle - Math.PI / 2;
        let force = p5.Vector.fromAngle(newAngle);
        force.mult(0.1);
        this.applyForce(force);
      }
      show() {
        p.stroke(255);
        p.strokeWeight(2);
        p.push();
        p.rectMode(p.CENTER);
        p.translate(this.pos.x, this.pos.y);
        p.rotate(this.angle);
        p.stroke(255);
        p.fill(120);

        p.triangle(0, -r, -r, r, r, r);

        p.rect(-r / 2, r, r / 3, r / 2);
        p.rect(r / 2, r, r / 3, r / 2);
        p.pop();
      }
    }

    let spaceship;
    let moverB;
    let attractor;
    let movers = [];

    sk.setup = () => {
      sk.createCanvas(800, 600);
      spaceship = new SpaceShip();
      p.background(20);
    };

    sk.draw = () => {
      p.background(20);

      spaceship.edges();
      spaceship.update();
      spaceship.show();
      if (p.keyIsDown(p.LEFT_ARROW)) {
        spaceship.turn(-0.03);
      } else if (p.keyIsDown(p.RIGHT_ARROW)) {
        spaceship.turn(0.03);
      } else if (p.keyIsDown(p.UP_ARROW)) {
        spaceship.pushing();
      }
    };
  });
};
export default spaceShip;
