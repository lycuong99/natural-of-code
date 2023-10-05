import * as p5 from "p5";

export default function sineWave() {
  const p = new p5((sk) => {
    let angles = [];
    let angleV = [];
    let r = 16;

    sk.setup = () => {
      sk.createCanvas(600, 400);
      let total = p.floor(p.width / (r * 2));
      for (let i = 0; i < total; i++) {
        angles[i] = 0;
        angleV[i] = i / 100;
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
        p.circle(x, y, r);
        p.line(x, 0, x, y);
        angles[i] += angleV[i];
      }
      p.endShape(p.CLOSE);
    };
  });
}
