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

const generateLetterDict = (inputString: Array<string>) => {
    const charCountMap: Record<string, number> = {}
    for (const char of inputString) {
        charCountMap[char] = (charCountMap[char] || 0) + 1
    }
    return charCountMap
}

const today = new Date()
const seed = today.getDate() // Use the day as the seed
const randomValues = getRandomValuesFromArray(alphabetArray, seed)
const initialHand = [...randomValues].slice(0.7)

function App() {
    const [letterCount, setLetterCount] = useState(20)
    const [currentLetters, setCurrentLetters] = useState<string[]>([...randomValues].slice(0, 7))
    const [currentWord, setCurrentWord] = useState('')
    const [inputValue, setInputValue] = useState('')

    // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     if (!event.target.value) {
    //         return
    //     }
    //     const newInput = event.target.value.toUpperCase()
    //     console.log(newInput)

    //     if (currentLetters.includes(newInput)) {
    //         const newCurrentWord = currentWord.concat(newInput)
    //         setCurrentWord(newCurrentWord)
    //         const index = currentLetters.indexOf(newInput)
    //         if (index !== -1) {
    //             setCurrentLetters(currentLetters.filter((c, i) => i !== index))
    //         }
    //         setInputValue(newCurrentWord)
    //     }
    // }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const initialLetterDict = generateLetterDict(currentLetters)
        const inputValue = event.target.value

        // Validate the input against the allowed characters
        console.log(initialLetterDict)
        const sanitizedInput = inputValue
            .split('')
            .filter((char) => {
                const normalized = char.toUpperCase()
                if (initialLetterDict[normalized] && initialLetterDict[normalized] > 0) {
                    initialLetterDict[normalized] -= 1
                    return true
                }
                return false
            })
            .join('')
        console.log(initialLetterDict)
        setInputValue(sanitizedInput)
        setCurrentWord(sanitizedInput)
    }

    const handleSubmit = () => {
        const lettersUsed = currentWord.length
        setLetterCount(letterCount - lettersUsed)
        // setCurrentLetters([...randomValues].slice(lettersUsed, lettersUsed + 7))
    }

    return (
        <>
            <input name='text input' value={inputValue} onChange={handleInputChange}></input>
            <h1>Current word: {currentWord}</h1>
            <button onClick={handleSubmit}>Submit</button>
            <h1>{randomValues}</h1>
            <h1>Current Hand: {currentLetters}</h1>
            <h1>{`Remaining letters: ${letterCount}`}</h1>
        </>
    )
}

export default App
