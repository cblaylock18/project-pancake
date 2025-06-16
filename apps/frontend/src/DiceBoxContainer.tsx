import { useEffect, useRef } from 'react'
// @ts-expect-error no types for this lib, will do later
import DiceBox from '@3d-dice/dice-box'


export default function DiceBoxContainer() {


  const diceBoxRef = useRef(null)
  let diceBox: any = null

  useEffect(() => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      diceBox = new DiceBox("#dice-box", {
          assetPath: './public/assets/assets', // Path to your assets
      })

      diceBox.init().then(() => {
          diceBox.roll('2d20') // Example roll
      })
  }, [])

  return <div ref={diceBoxRef} id="dice-box" className=""></div>
}
