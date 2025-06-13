import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

// example for you for shared types!
import type { User } from "@shared/types";
import { Role } from "@shared/types"

const Sidney: User = {
    id: "some string",
    username: "some other string",
    password: "lamb",
    createdAt: "today",
    email: "something@lamb.pancake",
    role: Role.USER
};
console.log(`hi ${Sidney.username}!!!`);
// end of example!

function App() {
    const [count, setCount] = useState(0);
    const [info, setInfo] = useState()

    useEffect(() => {
        fetch("http://localhost:3000", {mode: "cors"}).then(
            response => response.json()
        ).then(data => {setInfo(data.message); console.log(data)})
    },[])

    return (
        <>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img
                        src={reactLogo}
                        className="logo react"
                        alt="React logo"
                    />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>Info is {info}</p>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    );
}

export default App;
