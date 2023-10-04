import * as p5 from "p5";

const mutualAttraction = () => {
  const p = new p5((sk) => {
    sk.setup = () => {
      sk.createCanvas(600, 600);
      p.angleMode(p.RADIANS);
    };
    let angle = 0;
    let angleV = 0;
    let angleA = 0;
    let pAngle = 0;
    sk.mouseDragged = () => {
      let v = p.createVector(p.pmouseX - p.width / 2, p.pmouseY - p.height / 2);
      pAngle = v.heading();
      console.log(pAngle);
    };
    sk.mouseReleased = () => {
      let v2 = p.createVector(p.mouseX - p.width / 2, p.mouseY - p.height / 2);
      angleV = v2.heading() - pAngle;
      console.log("mouseReleased", angleV);
    };
    sk.draw = () => {
      if (p.mouseIsPressed) {
        let v = p.createVector(p.mouseX - p.width / 2, p.mouseY - p.height / 2);
        angle = v.heading();
      }
      p.background(20, 84, 181);
      p.noStroke();
      p.fill(255, 50, 120);
      p.rectMode(p.CENTER);
      p.translate(300, 300);

      p.rotate(angle);
      p.rect(0, 0, 256, 32);

      angle += angleV;
      angleV += angleA;
    };
  });
};
export default mutualAttraction;
