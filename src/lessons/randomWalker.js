import * as p5 from "p5";

//Perlin Noise - 3d
const randomWalker = () => {
  const p = new p5((sk) => {
    sk.setup = () => {
      sk.createCanvas(400, 400);
      sk.background(40);
    };

    let inc = 0.005;
    let start = 0;
    let xoff = start;
    let x = 200;
    let y = 200;
    sk.draw = () => {
      
      sk.stroke(255);
      sk.strokeWeight(2);
      p.point(x, y);

      let r = p.floor(p.random(4));
      switch (r) {
        case 0:
          x += 1;
          break;
        case 1:
          x -= 1;
          break;
        case 2:
          y += 1;
          break;
        case 3:
          y -= 1;
          break;
      }
    };
  });
};
export default randomWalker;
