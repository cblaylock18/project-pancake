import { useEffect, useRef } from "react";
// @ts-expect-error no types for this lib, will do later
import DiceBox from "@3d-dice/dice-box";

export default function DiceBoxContainer() {
    const diceBoxRef = useRef(null);
    // @ts-expect-error no types for this library
    let diceBox = null;

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        diceBox = new DiceBox({
            assetPath: "/assets/", // include the trailing backslash
            scale: 9,
        });

        diceBox.init().then(() => {
            // @ts-expect-error no types for this library
            diceBox.roll("2d20"); // Example roll
        });
    }, []);

    return <div ref={diceBoxRef} id="dice-box" className=""></div>;
}
