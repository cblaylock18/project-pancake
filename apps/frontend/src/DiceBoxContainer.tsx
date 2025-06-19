import { useEffect, useRef, useState } from "react";
// @ts-expect-error no types for this lib
import DiceBox from "@3d-dice/dice-box";

export default function DiceBoxContainer() {
    const diceBoxRef = useRef(null);
    const [rollValue, setRollValue] = useState(0);
    const [diceBox, setDiceBox] = useState(null);

    useEffect(() => {
        const newDiceBox = new DiceBox({
            assetPath: "/assets/", // include the trailing backslash
            scale: 12,
            theme: "rock",
            container: "#dice-box",
            themeColor: "#808080", // dice color
        });

        async function initializeDice() {
            const initializedDiceBox = await newDiceBox.init();

            setDiceBox(initializedDiceBox);
        }

        initializeDice();
    }, []);

    async function roll() {
        if (!diceBox) {
            return;
        }
        // @ts-expect-error no types for this lib
        await diceBox.roll("2d20");
        // @ts-expect-error no types for this lib
        const rollResult = await diceBox.getRollResults("2d20");
        setRollValue(rollResult[0].value);
    }

    return (
        <>
            {diceBox ? (
                <button onClick={roll}>Roll 2d20!</button>
            ) : (
                <button disabled>Loading dice roller...</button>
            )}
            <p className="text-5xl">Roll Total: {rollValue}</p>
            <div
                ref={diceBoxRef}
                id="dice-box"
                className="w-full h-96 border rounded-lg bg-slate-800 m-0 p-0"
            ></div>
        </>
    );
}
