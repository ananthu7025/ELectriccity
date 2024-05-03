import React, { useState } from "react";
import "./App.css"; // Import CSS file for styling

const App = () => {
  const [consumedUnits, setConsumedUnits] = useState(null); // Initialize with null
  const [totalBill, setTotalBill] = useState("");

  const calculateBill = () => {
    // Tariff structure
    const tariff = {
      1: { units: 50, rate: 3.25 },
      2: { units: 50, rate: 4.05 },
      3: { units: 50, rate: 5.1 },
      4: { units: 50, rate: 6.95 },
      5: { units: 50, rate: 8.2 },
      6: { units: Infinity, rate: 8.8 }, // Infinity represents all remaining units
    };

    const additionalCharges = {
      dutyCharge: 775,
      fuelCharge: 88,
      fixedCharge: 460,
      meterCharge: 14,
      autorecoveryCharge: 98,
    };

    let energyCost = 0;

    // Check if consumedUnits is null or empty
    if (!consumedUnits || consumedUnits <= 0 || isNaN(consumedUnits)) {
      setTotalBill("Please enter valid consumed units.");
      return;
    }

    let remainingUnits = consumedUnits;

    // Calculate energy cost based on tariff structure
    for (let i = 1; i <= 6; i++) {
      if (remainingUnits <= 0) {
        break;
      }
      const { units, rate } = tariff[i];
      const unitsInBracket = Math.min(units, remainingUnits);
      energyCost += unitsInBracket * rate;
      remainingUnits -= unitsInBracket;
    }

    // Add additional charges
    let totalCost =
      energyCost +
      additionalCharges.dutyCharge +
      additionalCharges.fuelCharge +
      additionalCharges.fixedCharge +
      additionalCharges.meterCharge +
      additionalCharges.autorecoveryCharge;

    // Set total bill
    setTotalBill(totalCost.toFixed(2));
  };

  return (
    <div className="container">
      <h1>Enter Consumed Units:</h1>
      <input
        className="input-field" // Apply CSS class for input field
        onChange={(event) => setConsumedUnits(event.target.value ? parseFloat(event.target.value) : null)} // Set to null if empty
        value={consumedUnits === null ? "" : consumedUnits} // Render empty string if null
      />
      <button className="calculate-btn" onClick={calculateBill}>Calculate</button>
      {totalBill !== "" && <h1>Total Bill: ₹{totalBill}</h1>}
    </div>
  );
};

export default App;
