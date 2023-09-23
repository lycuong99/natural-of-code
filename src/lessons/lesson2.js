import * as p5 from "p5";

//Perlin Noise - 3d
const lesson2 = () => {
  const p = new p5((sk) => {
    sk.setup = () => {
      sk.createCanvas(400, 400);
      p.pixelDensity();
      //cao thì mịn hơn
      p.noiseDetail(110, 0.2)
    };

    let inc = 0.005;
    let start = 0;
    let xoff = start;
    sk.draw = () => {
      p.loadPixels();
      sk.background(40);
      sk.noFill();
      sk.beginShape();
      xoff = start;
      let yoff = start;
      for (let x = 0; x < sk.width; x++) {
        yoff = start;
        for (let y = 0; y < sk.height; y++) {
          let index = (x + y * sk.width) * 4;
          let r = p.noise(xoff, yoff) * 255;
          p.pixels[index + 0] = r;
          p.pixels[index + 1] = r;
          p.pixels[index + 2] = r;
          p.pixels[index + 3] = 255;

          yoff += inc;
        }
        xoff += inc;
      }

      p.updatePixels();

      sk.endShape();
      //   start += inc;
    };
  });
};
export default lesson2;
