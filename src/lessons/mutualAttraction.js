import * as p5 from "p5";

const mutualAttraction = () => {
  const p = new p5((sk) => {
    class Attractor {
      constructor(x, y, m) {
        this.pos = p.createVector(x, y);
        this.mass = m;
        this.r = Math.sqrt(this.mass) * 2;
      }
      attract(mover) {
        const G = 5;
        let force = p5.Vector.sub(this.pos, mover.pos);

        let rSq = p.constrain(force.magSq(), 100, 1000);
        console.log(force.magSq(), rSq);
        let strength = (G * this.mass * mover.mass) / rSq;
        console.log(strength);
        force.setMag(strength);
        mover.applyForce(force);
      }
      show() {
        p.fill(255);
        p.ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
      }
    }
    class Mover {
      constructor(x, y, m) {
        this.pos = p.createVector(x, y);
        this.vel = p5.Vector.random2D();
        this.acc = p.createVector(0, 0);
        this.vel.mult(0.1)
        this.mass = m;
        this.r = Math.sqrt(this.mass) * 2;
      }
      applyForce(force) {
        let f = p5.Vector.div(force, this.mass);
        this.acc.add(f);
      }
      drag() {
        let drag = this.vel.copy();
        drag.normalize();
        drag.mult(-1);

        let c = 0.4;
        let speedSq = this.vel.magSq();
        drag.setMag(c * speedSq);
        this.applyForce(drag);
      }
      attract(mover) {
        const G = 5;
        let force = p5.Vector.sub(this.pos, mover.pos);

        let rSq = p.constrain(force.magSq(), 100, 1000);
        console.log(force.magSq(), rSq);
        let strength = (G * this.mass * mover.mass) / rSq;
        console.log(strength);
        force.setMag(strength);
        mover.applyForce(force);
      }
      friction() {
        let diff = p.height - (this.pos.y + this.r);
        if (diff < 1) {
          //direction of friction
          let friction = this.vel.copy();

          friction.normalize();

          friction.mult(-1);
          console.log("friction", this.vel, friction);
          let mu = 0.1;
          //N is normal force proportional to mass
          let normal = this.mass;
          friction.setMag(mu * normal);

          this.applyForce(friction);
        }
      }
      edges() {
        if (this.pos.x > p.width - this.r) {
          this.pos.x = p.width - this.r;
          this.vel.x *= -1;
        }
        if (this.pos.x < this.r) {
          this.pos.x = this.r;
          this.vel.x *= -1;
        }
        if (this.pos.y > p.height - this.r) {
          this.pos.y = p.height - this.r;
          this.vel.y *= -1;
        }
        if (this.pos.y < this.r) {
          this.pos.y = this.r;
          this.vel.y *= -1;
        }
      }
      update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.set(0, 0);
      }
      show() {
        p.stroke(255);
        p.strokeWeight(2);
        p.fill(255, 100);
        p.ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
      }
    }

    let moverA;
    let moverB;
    let attractor;
    let movers = [];
    sk.setup = () => {
      sk.createCanvas(600, 600);
      moverA = new Mover(50, 100, 24);
      moverB = new Mover(200, 100, 24);
      for (let i = 0; i < 2; i++) {
        let x = p.random(p.width);
        let y = p.random(p.height);
        let m = p.random(50, 150);
        movers[i] = new Mover(x, y, m);
      }
      attractor = new Attractor(p.width / 2, p.height / 2, 100);
      p.background(20);
    };

    sk.draw = () => {
      p.background(20);
      p.fill(255, 50);
      p.noStroke();

      for (let i = 0; i < movers.length; i++) {
        for (let j = 0; j < movers.length; j++) {
          if (i != j) {
            movers[i].attract(movers[j]);
          }
        }
        movers[i].update();
        movers[i].show();
      }

      if (p.mouseIsPressed) {
        attractor.pos.x = p.mouseX;
        attractor.pos.y = p.mouseY;
      }

      attractor.show();
    };
  });
};
export default mutualAttraction;
