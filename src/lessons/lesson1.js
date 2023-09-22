import * as p5 from "p5";

//Perlin Noise 2d
const lesson1 = () => {
  const drawer = new p5((sk) => {
    sk.setup = () => {
      sk.createCanvas(400, 400);
    };

    let inc = 0.01;
    let start = 0;
    sk.draw = () => {
      sk.background(40);
      sk.noFill();
      sk.beginShape();

      let xoff = start;
      for (let x = 0; x < sk.width; x++) {
        sk.stroke(255);
        let n = sk.map(sk.noise(xoff), 0, 1, 0, sk.height);
        let s = sk.map(sk.sin(xoff), -1, 1, -50, 50);
        let y = s + n;
        sk.vertex(x, y);
        xoff += inc;
      }
      sk.endShape();
      start += inc;
    };
  });
};
export default lesson1;
