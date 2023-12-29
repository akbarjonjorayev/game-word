import { appData } from './data/appData.js'
import * as Fetch from './fetch.js'

const signArr = [-10, 1, 10, -1]

function lineBtns(index) {
  const res = []
  const maxVal = [
    index % 10,
    index - (index % 10) + 9,
    90 + (index % 10),
    index - (index % 10),
  ]

  for (let i = 1; i < 10; i++) {
    for (let j = 0; j < signArr.length; j++) {
      const num = index + i * signArr[j]
      if (num >= maxVal[j] && (j == 0 || j == 3))
        res.push(index + i * signArr[j])
      if (num <= maxVal[j] && (j == 1 || j == 2))
        res.push(index + i * signArr[j])
    }
  }

  return res
}

function wordData(arr) {
  const plBtns = document.getElementsByClassName('pl_btn')

  arr.sort((a, b) => a - b)
  let start = arr[0]
  let end = arr[1]

  const isVertical = arr[0] % 10 === arr[1] % 10
  const range = isVertical ? 10 : 1

  arr = []
  let word = ''

  while (start <= end) {
    const letter = plBtns[start].innerText
    word += letter
    arr.push(start)

    start += range
  }

  return { indexes: arr, isVertical, word }
}

function wordsArr(words) {
  const grid = Array.from({ length: 10 }, () => Array(10).fill(''))

  const positions = {}

  function canPlaceWord(row, col, word, isVertical) {
    for (let i = 0; i < word.length; i++) {
      if (isVertical) {
        if (row + i >= 10 || grid[row + i][col] !== '') {
          return false
        }
      } else {
        if (col + i >= 10 || grid[row][col + i] !== '') {
          return false
        }
      }
    }
    return true
  }

  for (const word of words) {
    let row, col, isVertical
    let attempts = 0

    do {
      isVertical = Math.random() < 0.5
      row = Math.floor(Math.random() * (isVertical ? 10 - word.length + 1 : 10))
      col = Math.floor(Math.random() * (isVertical ? 10 : 10 - word.length + 1))
      attempts++
    } while (!canPlaceWord(row, col, word, isVertical) && attempts < 100)

    if (attempts === 100) {
      continue
    }

    for (let i = 0; i < word.length; i++) {
      if (isVertical) {
        grid[row + i][col] = word[i]
      } else {
        grid[row][col + i] = word[i]
      }
    }

    positions[word] = {
      start: { row: row, col: col },
      end: {
        row: isVertical ? row + word.length - 1 : row,
        col: isVertical ? col : col + word.length - 1,
      },
      isVertical: isVertical,
    }
  }

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (grid[i][j] === '') {
        const randomLetter = String.fromCharCode(
          65 + Math.floor(Math.random() * 26)
        )
        grid[i][j] = randomLetter
      }
    }
  }

  return { grid, positions, words }
}

const wordURL = `https://random-word-api.herokuapp.com/word?length=`
const { min: wMin, max: wMax } = appData.words.length

async function wordsGrid(amount) {
  const words = []
  const fetchPromises = []

  for (let i = 0; i < amount; i++) {
    const randomNum = random(wMin, wMax)
    const wordStr = `${wordURL}${randomNum}`

    const promise = Fetch.get(wordStr).then((res) =>
      words.push(res[0].toUpperCase())
    )
    fetchPromises.push(promise)
  }

  return Promise.all(fetchPromises).then(() => wordsArr(words))
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export { lineBtns, wordData, wordsArr, wordsGrid }
