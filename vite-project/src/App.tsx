import { useState } from 'react'
import './App.css'

type AlphabetLetter =
    | 'A'
    | 'B'
    | 'C'
    | 'D'
    | 'E'
    | 'F'
    | 'G'
    | 'H'
    | 'I'
    | 'J'
    | 'K'
    | 'L'
    | 'M'
    | 'N'
    | 'O'
    | 'P'
    | 'Q'
    | 'R'
    | 'S'
    | 'T'
    | 'U'
    | 'V'
    | 'W'
    | 'X'
    | 'Y'
    | 'Z'

const alphabetArray: AlphabetLetter[] = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
]

const MAX_HAND_SIZE = 7

function App() {
    const [letterCount, setLetterCount] = useState(20)
    const [currentLetters, setCurrentLetters] = useState<string[]>([])

    function getRandomValuesBasedOnDay(seed: number, count: number): number[] {
        const randomValues: number[] = []
        let currentSeed = seed

        for (let i = 0; i < count; i++) {
            currentSeed = (currentSeed * 9301 + 49297) % 233280
            const randomNumber = (currentSeed / 233280.0) * 27 // Scale to 0-26
            randomValues.push(Math.floor(randomNumber))
        }

        return randomValues
    }

    function getRandomValuesFromArray<T>(array: T[], seed: number): T[] {
        const randomIndices = getRandomValuesBasedOnDay(seed, 20)
        const result: T[] = []

        for (const index of randomIndices) {
            result.push(array[index])
        }

        return result
    }

    // Example usage:
    const myArray = [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
    ] // Array of alphabet letters
    const today = new Date()
    const seed = today.getDate() // Use the day as the seed
    const randomValues = getRandomValuesFromArray(myArray, seed)

    return (
        <>
            <h1>{randomValues}</h1>
            <h1>{`Remaining letters: ${letterCount}`}</h1>
        </>
    )
}

export default App
