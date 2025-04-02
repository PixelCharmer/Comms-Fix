import WiringPuzzle from "./components/WiringPuzzle";
import FrequencyDial from "./components/FrequencyDial";
import { useGameStore } from "./store";
import "./styles.css";

function App() {
    const { isSolved } = useGameStore();

    return (
        <div className="container">
            <h2>The ship's communication array is offline</h2>
            <p>Reconnect the system to reestablish contact with mission control</p>
            {!isSolved ? (
                <>
                    <WiringPuzzle />
                </>
            ) : (
                <SuccessMessage />
            )}
        </div>
    );
}

export default App;
