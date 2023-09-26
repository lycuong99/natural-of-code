import * as p5 from "p5";

const dragForce = () => {
  const p = new p5((sk) => {
    class Mover {
      constructor(x, y, m) {
        this.pos = p.createVector(x, y);
        this.vel = p.createVector(0, 0);
        this.acc = p.createVector(0, 0);

        this.mass = m;
        this.r = Math.sqrt(this.mass) * 10;
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
    sk.setup = () => {
      sk.createCanvas(400, 400);
      moverA = new Mover(100, 100, 2);
      moverB = new Mover(200, 100, 4);
    };

    sk.draw = () => {
      p.background(20);
      p.fill(255, 50);
      p.noStroke();
      p.rect(0, p.height / 2, p.width, p.height / 2);
      let gravity = p.createVector(0, 0.3);

      let weightA = p5.Vector.mult(gravity, moverA.mass);
      let weightB = p5.Vector.mult(gravity, moverB.mass);
      moverA.applyForce(weightA);
      moverB.applyForce(weightB);
      if (p.mouseIsPressed) {
        let wind = p.createVector(0.1, 0);
        moverA.applyForce(wind);
        moverB.applyForce(wind);
      }
      if (moverA.pos.y > p.height / 2) {
        moverA.drag();
      }
      if (moverB.pos.y > p.height / 2) {
        moverB.drag();
      }
      moverA.update();
      moverA.edges();
      moverA.show();
      moverB.edges();
      //   moverB.friction();
      moverB.update();
      moverB.show();
    };
  });
};
export default dragForce;
