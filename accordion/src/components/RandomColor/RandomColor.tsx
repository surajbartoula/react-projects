import { useEffect, useState } from "react";

export default function RandomColor() {
  const [typeOfColor, setTypeOfColor] = useState("hex");
  const [color, setColor] = useState("#000000");

  // Generate a random number from 0 to max - 1
  const randomInt = (max: number) => Math.floor(Math.random() * max);

  // Generate random HEX color
  const randomHexColor = () =>
    "#" + Array.from({ length: 6 }, () => randomInt(16).toString(16)).join("");

  // Generate random RGB color
  const randomRgbColor = () =>
    `rgb(${randomInt(256)}, ${randomInt(256)}, ${randomInt(256)})`;

  // Generate color based on type
  const generateColor = () => {
    setColor(typeOfColor === "hex" ? randomHexColor() : randomRgbColor());
  };

  // Update color whenever type changes
  useEffect(() => {
    generateColor();
  }, [typeOfColor]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: color,
      }}
    >
      <div style={{ display: "flex", gap: "10px", padding: "20px" }}>
        <button onClick={() => setTypeOfColor("hex")}>HEX Color</button>
        <button onClick={() => setTypeOfColor("rgb")}>RGB Color</button>
        <button onClick={generateColor}>Generate Random Color</button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          fontSize: "60px",
          marginTop: "50px",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h3>{typeOfColor === "rgb" ? "RGB Color" : "HEX Color"}</h3>
        <h1>{color}</h1>
      </div>
    </div>
  );
}
