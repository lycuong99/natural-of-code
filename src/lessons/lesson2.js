import * as p5 from "p5";

//Perlin Noise - 3d
const lesson2 = () => {
  const p = new p5((sk) => {
    sk.setup = () => {
      sk.createCanvas(400, 400);
      p.pixelDensity();
    };

    let inc = 0.01;
    let start = 0;
    sk.draw = () => {
      p.loadPixels();
      sk.background(40);
      sk.noFill();
      sk.beginShape();

      for (let x = 0; x < sk.width; x++) {
        for (let y = 0; y < sk.height; y++) {
          let index = (x + y * sk.width) * 4;
          p.pixels[index + 0] = 255;
          p.pixels[index + 1] = 0;
          p.pixels[index + 2] = 0;
          p.pixels[index + 3] = 255;
        }
      }
      p.updatePixels();
      let xoff = start;

      sk.endShape();
      start += inc;
    };
  });
};
export default lesson2;
