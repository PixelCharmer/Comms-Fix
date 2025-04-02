import { useState } from "react";
import "../styles.css";

const frequencies = [145.8, 210.3, 98.5]; // Correct frequencies to tune to

function FrequencyDialPuzzle() {
    const [currentFrequency, setCurrentFrequency] = useState(0);

    const handleDialChange = (e) => {
        setCurrentFrequency(parseFloat(e.target.value));
    };

    const checkFrequency = () => {
        if (frequencies.includes(currentFrequency)) {
            alert("Success! The communication system is repaired.");
            // Transition to next phase or puzzle if needed
        } else {
            alert("Incorrect frequency. Try again.");
        }
    };

    return (
        <div className="puzzle">
            <h2>Frequency Dial Puzzle</h2>
            <p>Tune the dial to the correct frequency.</p>
            <input
                type="range"
                min="90"
                max="220"
                step="0.1"
                value={currentFrequency}
                onChange={handleDialChange}
                style={{ width: "100%" }}
            />
            <p>Current Frequency: {currentFrequency} MHz</p>
            <button onClick={checkFrequency}>Check Frequency</button>
        </div>
    );
}

export default FrequencyDialPuzzle;
