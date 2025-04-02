import React, { useState } from "react";

function FrequencyDial() {
    const [selectedStation, setSelectedStation] = useState("WTCY"); // Default station
    const [isCorrect, setIsCorrect] = useState(null);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const stations = ["WTCY", "WHGB", "WNNK", "WXYZ"];
    const correctStation = "WNNK";

    const handleButtonClick = (station) => {
        setSelectedStation(station);
    };

    const validateSelection = () => {
        if (selectedStation === correctStation) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
        setHasSubmitted(true);
    };

    const resetFrequency = () => {
        setSelectedStation("WTCY");
        setIsCorrect(null);
        setHasSubmitted(false);
    };

    return (
        <div className="frequency-dial">
            <h3>Select the Correct Station</h3>

            {/* Radio station buttons */}
            <div className="stations">
                {stations.map((station) => (
                    <button
                        key={station}
                        onClick={() => handleButtonClick(station)}
                        style={{
                            backgroundColor: selectedStation === station ? "#D3B0FF" : "#D3B0FF",  // Light Purple
                            color: "black",  // Text color
                            border: "none", // Remove border for a cleaner look
                            padding: "10px 20px",
                            margin: "5px",
                            borderRadius: "5px", // Optional for rounded buttons
                        }}
                    >
                        {station}
                    </button>
                ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <p>Selected Station: {selectedStation}</p>
            </div>

            {/* Submit Button */}
            {!hasSubmitted && (
                <button
                    onClick={validateSelection}
                    style={{
                        backgroundColor: "#D3B0FF",  // Light Purple
                        color: "black",  // Text color
                        border: "none",
                        padding: "10px 20px",
                        margin: "10px",
                        borderRadius: "5px",
                        fontSize: "16px"
                    }}
                >
                    Submit Selection
                </button>
            )}

            {/* Feedback Message */}
            {isCorrect !== null && isCorrect && <p style={{ color: "green" }}>Mission Control Distress Code: 39741</p>}
            {isCorrect !== null && !isCorrect && <p style={{ color: "red" }}>Mission Control Still Cant Hear You - Reset Above</p>}

            {/* Reset Button */}
            {isCorrect === false && hasSubmitted && (
                <button
                    onClick={resetFrequency}
                    style={{
                        marginTop: "10px",
                        backgroundColor: "#D3B0FF",
                        color: "black",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "5px",
                        fontSize: "16px"
                    }}
                >
                    Reset Selection
                </button>
            )}
        </div>
    );
}

export default FrequencyDial;
