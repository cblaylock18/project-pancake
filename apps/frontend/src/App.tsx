import { useState, useEffect } from 'react'
import './App.css'

// example for you for shared types!
import type { User } from '@shared/types'
import { Role } from '@shared/types'
import DiceBoxContainer from './DiceBoxContainer'

const Sidney: User = {
    id: 'some string',
    username: 'some other string',
    password: 'lamb',
    createdAt: 'today',
    email: 'something@lamb.pancake',
    role: Role.USER,
}
console.log(`hi ${Sidney.username}!!!`)
// end of example!

function App() {
    const [info, setInfo] = useState()

    useEffect(() => {
        console.log(import.meta.env.VITE_BACKEND_URL)
        fetch(import.meta.env.VITE_BACKEND_URL, { mode: 'cors' })
            .then(response => response.json())
            .then(data => {
                setInfo(data.message)
                console.log(data)
            })
    }, [])

    return (
        <>
            <DiceBoxContainer />
            <div className="text-4xl">{info}</div>
        </>
    )
}

export default App
