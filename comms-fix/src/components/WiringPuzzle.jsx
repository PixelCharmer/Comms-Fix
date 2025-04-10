import { useState } from "react";
import { useGameStore } from "../store";
import FrequencyDial from "./FrequencyDial";
import "../styles.css";

const wires = [
    { id: "112.9", correctPort: "MHz", isCorrect: true },
    { id: "77.4", correctPort: "GHz", isCorrect: true },
    { id: "303.1", correctPort: "GHz", isCorrect: false },
    { id: "134.2", correctPort: "MHz", isCorrect: false },
    { id: "499.6", correctPort: "kHz", isCorrect: true },
    { id: "275.8", correctPort: "kHz", isCorrect: false },
];

const ports = ["GHz", "kHz", "MHz"];

const connectionColorsList = ["pink", "orange", "blue", "yellow"];

function WiringPuzzle() {
    const { setWiring } = useGameStore();
    const [selectedWire, setSelectedWire] = useState(null);
    const [connections, setConnections] = useState({});
    const [connectionColors, setConnectionColors] = useState({});
    const [isWiringCorrect, setIsWiringCorrect] = useState(false);
    const [showHints, setShowHints] = useState(false);

    const handleWireSelect = (wireId) => {
        setSelectedWire(wireId);
    };

    const handlePortSelect = (portId) => {
        if (!selectedWire) return;

        // Prevent multiple wires to same port
        const alreadyConnected = Object.values(connections).includes(portId);
        if (alreadyConnected) return;

        const newConnections = { ...connections, [selectedWire]: portId };

        // Assign a new color for this connection
        const usedColors = Object.values(connectionColors);
        const availableColor = connectionColorsList.find(c => !usedColors.includes(c)) || "grey";
        const newConnectionColors = { ...connectionColors, [selectedWire]: availableColor, [portId]: availableColor };

        setConnections(newConnections);
        setConnectionColors(newConnectionColors);
        setSelectedWire(null);
    };

    const validateWiring = () => {
        const correctConnections = {
            "303.1": "kHz",
            "275.8": "GHz",
            "77.4": "MHz"
        };

        let allCorrect = true;
        for (const [wire, port] of Object.entries(connections)) {
            if (correctConnections[wire.trim()] !== port) {
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
        setConnectionColors({});
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
                        <li><strong>Note 1:</strong> Only one wire per port </li>
                        <li><strong>Note 2:</strong> Some are faulty—watch out!</li>
                        <li><strong>Note 3:</strong> Wire and port need to match correctly.</li>
                        <li><strong>Note 4:</strong> Only 3 connections needed </li>
                    </ul>
                </div>
            )}

            <div className="wiring-container">
                <div className="wires">
                    {wires.map((wire) => (
                        <button
                            key={wire.id}
                            className={`wire ${selectedWire === wire.id ? "selected" : ""}`}
                            style={{ backgroundColor: connectionColors[wire.id] || "grey" }}
                            onClick={() => handleWireSelect(wire.id)}
                        >
                            {wire.id}
                        </button>
                    ))}
                </div>

                <div className="ports">
                    {ports.map((portId) => (
                        <button
                            key={portId}
                            className="port"
                            style={{ backgroundColor: connectionColors[portId] || "navy" }}
                            onClick={() => handlePortSelect(portId)}
                        >
                            {portId} {Object.values(connections).includes(portId) && "✔"}
                        </button>
                    ))}
                </div>
            </div>

            <button onClick={validateWiring}>Check Wiring</button>
            <button onClick={resetPuzzle}>Reset Wires</button>

            {isWiringCorrect && <FrequencyDial />}
        </div>
    );
}

export default WiringPuzzle;
