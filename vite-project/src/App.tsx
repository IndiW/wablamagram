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

    const getRandomValue = (arr: Array<string>) => {
        const randomIndex = Math.floor(Math.random() * arr.length)
        return arr[randomIndex]
    }

    const generateLetterSet = () => {
        let currentLetterSetLength = currentLetters.length
        const newArray = currentLetters
        while (currentLetterSetLength <= MAX_HAND_SIZE) {
            newArray.push(getRandomValue(alphabetArray))
            currentLetterSetLength += 1
        }
        setCurrentLetters(newArray)
    }

    return (
        <>
            <h1>{getRandomValue(alphabetArray)}</h1>
            <h1>{`Remaining letters: ${letterCount}`}</h1>
        </>
    )
}

export default App
