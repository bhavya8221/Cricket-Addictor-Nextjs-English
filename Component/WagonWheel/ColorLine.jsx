import React, { useRef, useEffect } from "react";
import styles from "./WagonWheel.module.scss";
function ColorLine({ endpoints }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Draw each line with its own color
    for (let i = 0; i < endpoints.length; i++) {
      const { x, y, runs } = endpoints[i];

      // Set the line color
      ctx.strokeStyle =
        runs === 1
          ? "#FD9A00"
          : runs === 2
          ? "#E962ED"
          : runs === 3
          ? "#1EBAAF"
          : runs === 4
          ? "#355EFF"
          : runs === 6
          ? "#E7604D"
          : "#534019";

      //     // Calculate the center point of the canvas

         
      const centerX = canvas.width/2;
      const centerY = canvas.height /2-10;
      
    //   const centerX = (canvas.width-20) /2;
    //   const centerY = (canvas.height-20) /2+5;
      //   const centerX = 200;
      //   const centerY = 180;

      // Draw the line

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }, [endpoints]);

  return (
    // <div className="canvasss">
    
    <div className={styles.colorline}>
    <div
      className=""
    //   style={{ textAlign: "center" }}
    >
      <canvas ref={canvasRef} className={styles.imgsize} style={{padding:20}}></canvas>
      {/* <img src={wheel} alt="images" className="imgsize" /> */}
    </div>

    </div>
  );
}

export default ColorLine;
