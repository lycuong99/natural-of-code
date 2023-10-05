import * as p5 from "p5";

//Perlin Noise 2d
const polarCoor = () => {
  const p = new p5((sk) => {
    sk.setup = () => {
      sk.createCanvas(400, 400);
    };

    let angle = 0;
    let r = 150;
    sk.draw = () => {
      p.background(0);
      p.translate(200, 200);
      p.stroke(255);
      p.strokeWeight(4);
      p.noFill();
      // circle(0, 0, r * 2);

      let increment = p.map(p.mouseX, 0, p.width, p.PI, 0.01);
    //   let increment = 0.1;
    //   p.noLoop();
      p.beginShape();
      for (let a = 0; a < p.TWO_PI; a += increment) {
        let r1 = r + p.random(-50, 10);
        let x = r * p.cos(a);
        let y = r * p.sin(a);
        p.vertex(x, y);
      }
      p.endShape(p.CLOSE);
    };
  });
};
export default polarCoor;
