import * as p5 from "p5";

const drawFlower = () => {
  const p = new p5((sk) => {
    class Mover {
      constructor(x, y) {
        this.pos = p.createVector(x, y);
        this.vel = p.createVector();
        // this.vel.mult(p.random(3));
      }
      update() {
        let mouse = p.createVector(p.mouseX, p.mouseY);
        this.acc = p5.Vector.sub(mouse, this.pos);
        this.acc.setMag(0.1);

        this.vel.add(this.acc);
        this.vel.limit(2);

        this.pos.add(this.vel);
        console.clear();
        console.log(this.vel.x, this.acc.x);
      }
      show() {
        p.stroke(255);
        p.strokeWeight(4);
        p.point(this.pos.x, this.pos.y);
      }
    }

    let mover;
    sk.setup = () => {
      sk.createCanvas(600, 600);
      mover = new Mover(200, 200);
      p.background(20);
    };

    sk.draw = () => {
      mover.update();
      mover.show();
    };
  });
};
export default drawFlower;
