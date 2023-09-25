import * as p5 from "p5";

//Perlin Noise - 3d
const randomWalker = () => {
  const p = new p5((sk) => {
    let pos;
    sk.setup = () => {
      sk.createCanvas(400, 400);
      sk.background(40);
      pos = p.createVector(200, 200);
    };

    sk.draw = () => {
      sk.stroke(255);
      sk.strokeWeight(2);
      

      let step = p5.Vector.random2D();
      step.mult(5);
      pos.add(step);
      p.point(pos.x, pos.y);
    };
  });
};
export default randomWalker;
