import * as p5 from "p5";

const accelerationVector = () => {
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
      edges() {
        if (this.pos.x > p.width) {
          this.pos.x = p.width - this.r;
          this.vel.x *= -1;
        }
        if (this.pos.x < this.r) {
          this.pos.x = this.r;
          this.vel.x *= -1;
        }
        if (this.pos.y > p.height) {
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
      moverA = new Mover(100, 200, 2);
      moverB = new Mover(100, 200, 4);
    };

    sk.draw = () => {
      p.background(20);
      let gravity = p.createVector(0, 0.2);
      let wind = p.createVector(0.1, 0);
      let weightA = p5.Vector.mult(gravity, moverA.mass);
      let weightB = p5.Vector.mult(gravity, moverB.mass);
      moverA.applyForce(weightA);
      moverB.applyForce(weightB);
      if (p.mouseIsPressed) {
        moverA.applyForce(wind);
        moverB.applyForce(wind);
      }

      moverA.edges();
      moverA.update();
      moverA.show();
      moverB.edges();
      moverB.update();
      moverB.show();
    };
  });
};
export default accelerationVector;
