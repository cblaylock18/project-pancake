import { useEffect, useRef, useState } from "react";
// @ts-expect-error no types for this lib
import DiceBox from "@3d-dice/dice-box";
import { useAuth } from "./context/AuthContext";

export default function DiceBoxContainer() {
    const diceBoxRef = useRef<HTMLDivElement | null>(null);
    const [rollValue, setRollValue] = useState(0);
    const [diceBox, setDiceBox] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const container = diceBoxRef.current;
        if (!container) return;

        const newDiceBox = new DiceBox({
            assetPath: "/assets/",
            scale: 12,
            theme: "rock",
            themeColor: "#808080",
            container: `#${container.id}`, // container is "#dice-box"
        });

        newDiceBox.init().then(() => {
            setDiceBox(newDiceBox);
        });

        return () => {
            setDiceBox(null);
            // React way: just clear the container's content if needed
            container.innerHTML = "";
        };
    }, []);

    async function roll() {
        if (!diceBox) return;
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
            <p className="text-5xl">
                Roll Total: {rollValue}
                {user ? ` Great toss ${user.username}!!` : ""}
            </p>
            <div
                ref={diceBoxRef}
                id="dice-box"
                className="w-full h-96 border rounded-lg bg-slate-800 m-0 p-0"
            />
        </>
    );
}
