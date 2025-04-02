import { useState } from "react";
import { useGameStore } from "../store";
import FrequencyDial from "./FrequencyDial";  // Now using buttons for frequency selection
import "../styles.css";

// Wires with one incorrect wire (trap)
const wires = [
    { id: "145.7", color: "grey", correctPort: "MHz", isCorrect: true },
    { id: "98.5", color: "grey", correctPort: "GHz", isCorrect: true },
    { id: "210.3", color: "grey", correctPort: "GHz", isCorrect: false },
    { id: "121.5", color: "grey", correctPort: "MHz", isCorrect: false },
    { id: "446.8", color: "grey", correctPort: "kHz", isCorrect: true },
    { id: "258.4", color: "grey", correctPort: "kHz", isCorrect: false },
];

const ports = [
    { id: "GHz", color: "navy" },
    { id: "kHz", color: "navy" },
    { id: "MHz", color: "navy" },
];

function WiringPuzzle() {
    const { setWiring } = useGameStore();
    const [selectedWire, setSelectedWire] = useState(null);
    const [connections, setConnections] = useState({});
    const [isWiringCorrect, setIsWiringCorrect] = useState(false);
    const [showHints, setShowHints] = useState(false);

    const handleWireSelect = (wireId) => {
        setSelectedWire(wireId);
    };

    const handlePortSelect = (portId) => {
        if (selectedWire) {
            setConnections((prev) => ({ ...prev, [selectedWire]: portId }));
            setSelectedWire(null);
        }
    };

    const validateWiring = () => {
        const correctConnections = {
            "145.7": "MHz",
            "98.5": "GHz",
            "446.8": "kHz"
        };

        let allCorrect = true;

        for (const [wire, port] of Object.entries(connections)) {
            const trimmedWire = wire.trim();  // Remove any spaces
            if (correctConnections[trimmedWire] !== port) {
                allCorrect = false;
            }
        }

        if (Object.keys(connections).length !== Object.keys(correctConnections).length) {
            allCorrect = false;
        }

        if (allCorrect) {
            setIsWiringCorrect(true);
            setWiring(true);
        } else {
            setShowHints(true);
        }
    };

    const resetPuzzle = () => {
        setConnections({});
        setSelectedWire(null);
        setIsWiringCorrect(false);
        setShowHints(false);
    };

    return (
        <div className="puzzle">
            <p>Click a wire, then a port to connect them</p>
            <p>Some wires might be traps!</p>

            {showHints && (
                <div className="notes">
                    <h3>Notes</h3>
                    <ul>
                        <li><strong>Note 1:</strong> Frequency Range: Each wire must be connected to the correct frequency. Make sure you’re aligning the right wire with its port—watch out for the traps!</li>
                        <li><strong>Note 2:</strong> Wires in Disguise: Not all wires are as they seem. Some of them are faulty. Be careful while connecting, as a faulty connection is blow up!</li>
                        <li><strong>Note 3:</strong> Matching Numbers: A true connection is made when the frequency number on the wire matches the frequency unit on the port. 145.7 should go to MHz, but what about the others?</li>
                        <li><strong>Note 3:</strong> Completion Check: To complete the puzzle, you must connect three wires to their correct ports. But remember, each port can only handle one connection.</li>
                    </ul>
                </div>
            )}

            <div className="wiring-container">
                <div className="wires">
                    {wires.map((wire) => (
                        <button
                            key={wire.id}
                            className={`wire ${selectedWire === wire.id ? "selected" : ""}`}
                            style={{ backgroundColor: wire.color }}
                            onClick={() => handleWireSelect(wire.id)}
                        >
                            {wire.id}
                        </button>
                    ))}
                </div>

                <div className="ports">
                    {ports.map((port) => (
                        <button
                            key={port.id}
                            className={`port ${connections[port.id] ? "connected" : ""}`}
                            style={{ backgroundColor: port.color }}
                            onClick={() => handlePortSelect(port.id)}
                        >
                            {port.id} {Object.keys(connections).find((w) => connections[w] === port.id) && "✔"}
                        </button>
                    ))}
                </div>
            </div>

            <button onClick={validateWiring}>Check Wiring</button>
            <button onClick={resetPuzzle}>Reset Puzzle</button>

            {/* Only show the Frequency Dial Puzzle if the wiring is correct */}
            {isWiringCorrect && <FrequencyDial />}
        </div>
    );
}

export default WiringPuzzle;
