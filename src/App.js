import { useState } from "react";

export default function App() {
  return (
    <div className="App">
      <Body />
    </div>
  );
}

function Body() {
  return (
    <div className="body-component">
      <Content />
      <Calculator />
    </div>
  );
}

function Content() {
  return (
    <div className="content-component">
      <h1>
        Body Mass
        <br /> Index Calculator
      </h1>
      <p>
        Better understand your weight in relation to your height using our body
        mass index (BMI) calculator. While BMI is not the sole determinant of a
        healthy weight, it offers a valuable starting point to evaluate your
        overall health and well-being.
      </p>
    </div>
  );
}

function Calculator() {
  const [unitSystem, setUnitSystem] = useState("metric");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const bmi = calculateBMI(unitSystem);

  function calculateBMI(unit) {
    const bmi = weight / Math.pow(height, 2);

    if (unit === "imperial") {
      return (bmi * 703).toFixed(2);
    }
    return (bmi * 10000).toFixed(2);
  }

  function minIdealWeight(unit) {
    const weight = 18.5 * height * height;

    if (unit === "imperial") {
      return (weight / 703).toFixed(2);
    }
    return (weight / 10000).toFixed(2);
  }

  function maxIdealWeight(unit) {
    const weight = 24.9 * height * height;

    if (unit === "imperial") {
      return (weight / 703).toFixed(2);
    }
    return (weight / 10000).toFixed(2);
  }

  return (
    <div className="calculator-component">
      <h3>Enter your details below!</h3>

      <div className="input-radio">
        <div className="input-radio1">
          <label className="custom-radio-btn">
            <input
              type="radio"
              value="metric"
              checked={unitSystem === "metric"}
              onChange={() => setUnitSystem("metric")}
            />
            <span className="checkmark"></span>
          </label>
          <label className="label-unit">Metric</label>
        </div>
        <div className="input-radio2">
          <label className="custom-radio-btn">
            <input
              type="radio"
              value="imperial"
              checked={unitSystem === "imperial"}
              onChange={() => setUnitSystem("imperial")}
            />
            <span className="checkmark"></span>
          </label>
          <label className="label-unit">Imperial</label>
        </div>
      </div>

      <div className="input-text">
        <div className="input-text1">
          <label className="label">Weight</label>
          <div className="input-group">
            <input
              type="text"
              placeholder="0"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
            />
            <span className="unit">
              {unitSystem === "metric" ? "kg" : "lb"}
            </span>
          </div>
        </div>
        <div className="input-text2">
          <label className="label">Height</label>
          <div className="input-group">
            <input
              type="text"
              placeholder="0"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
            />
            <span className="unit">
              {unitSystem === "metric" ? "cm" : "in"}
            </span>
          </div>
        </div>
      </div>

      <div className="result">
        {weight !== 0 && height !== 0 && weight !== "" && height !== "" ? (
          <div className="bmi">
            <div className="bmi-info">
              <p>Your BMI is...</p>
              <h1>{bmi}</h1>
            </div>
            <div className="bmi-suggestion">
              <p>
                Your BMI suggests you are{" "}
                {bmi < 18.5
                  ? "Underweight"
                  : bmi > 24.9
                  ? "Overweight"
                  : "Healthy weight"}
                . Your ideal weight is between {minIdealWeight(unitSystem)}{" "}
                {unitSystem === "metric" ? "kg" : "lb"} -{" "}
                {maxIdealWeight(unitSystem)}{" "}
                {unitSystem === "metric" ? "kg" : "lb"}.
              </p>
            </div>
          </div>
        ) : (
          <div className="welcome-div">
            <h2>Welcome!</h2>
            <p>
              Enter your weight and height and you'll see your BMI result here!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
