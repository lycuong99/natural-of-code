import * as p5 from "p5";

//Perlin Noise - 3d
const test = () => {
  const p = new p5((sk) => {
    sk.setup = () => {
      sk.createCanvas(400, 400);
      p.pixelDensity();
    };
    let root = sk.createVector(200, 200);

    sk.draw = () => {
      root = sk.createVector(200, 200);
      sk.background(40);

      let newPos = root.add(
        p.map(p.cos(sk.frameCount * 0.01), -1, 1, -100, 100),
        p.map(p.sin(sk.frameCount * 0.01), -1, 1, -100, 100)
      );
      sk.stroke(255);
      let direction = p.noise(sk.frameCount * 0.0001);
      for (let i = 0; i < 4; i++) {
        p.line(
          200,
          200,
          200 + p.map(p.cos(sk.frameCount * 0.01 + i), -1, 1, -100, 100),
          200 + p.map(p.sin(sk.frameCount * 0.01 + i), -1, 1, -100, 100)
        );
      }
      sk.stroke(255, 0, 0);
      for (let i = 0; i < 4; i++) {
        p.line(
          200,
          200,
          200 + p.map(p.cos(sk.frameCount * 0.01 + i), -1, 1, -50, 50),
          200 + p.map(p.sin(sk.frameCount * 0.01 * direction + i), -1, 1, -50, 50)
        );
      }
      sk.stroke(5, 250, 0);
      for (let i = 0; i < 4; i++) {
        p.point(
          200 + p.map(p.cos(sk.frameCount * 0.01 * direction + i), -1, 1, -50, 50),
          200 + p.map(p.sin(sk.frameCount * 0.01 + i), -1, 1, -50, 50)
        );
      }
      sk.stroke(5, 7, 250);
      for (let i = 0; i < 4; i++) {
        p.line(
          200,
          200,
          190 + p.map(p.cos(sk.frameCount * 0.01 * direction + i), -1, 1, -50, 50),
          190 + p.map(p.sin(sk.frameCount * 0.01 + i), -1, 1, -50, 50)
        );
      }
    };
  });
};
export default test;
