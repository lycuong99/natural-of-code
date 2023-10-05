import * as p5 from "p5";

export default function graphWave() {
  const p = new p5((sk) => {
    let angles = [];
    let angleV = [];
    let r = 16;

    sk.setup = () => {
      sk.createCanvas(600, 400);
      let total = p.floor(p.width / (r * 2));
      for (let i = 0; i < total + 1; i++) {
        angles[i] = p.map(i, 0, angles.length, 0, 2 * Math.PI);
        angleV[i] = i / 400;
      }
    };

    sk.draw = () => {
      p.background(0);
      p.translate(300, 200);
      p.stroke(255);
      p.strokeWeight(4);
      p.noFill();

      p.beginShape();
      for (let i = 0; i < angles.length; i++) {
        let x = p.map(i, 0, angles.length, -300, 300);
        let y = p.map(p.sin(angles[i]), -1, 1, -200, 200);
        // p.circle(x, y, r);
        // p.line(x, 0, x, y);
        p.vertex(x, y);
        angles[i] += angleV[i];
      }
      p.endShape(p.CLOSE);
    };
  });
}
