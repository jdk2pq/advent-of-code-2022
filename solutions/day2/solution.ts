import { read } from 'promise-path'
import { arrToNumberArr, reportGenerator, sortNumbers } from '../../util'

const report = reportGenerator(__filename)

export async function run(day: string) {
  const input = (await read(`solutions/${day}/input.txt`, 'utf8')).trim()

  const testInput = 'A Y\n' +
    'B X\n' +
    'C Z'
  const testInputAsArray = testInput.split('\n')

  const inputAsArray = input.split('\n')

  await solveForFirstStar(testInput, testInputAsArray, true, true)
  await solveForFirstStar(input, inputAsArray, false, false)
  await solveForSecondStar(testInput, testInputAsArray, true, true)
  await solveForSecondStar(input, inputAsArray, false, false)
}

async function solveForFirstStar(
  input: string,
  inputAsArray: Array<any>,
  test: boolean,
  debug: boolean
) {
  console.time('part 1')

  const solution = inputAsArray.reduce((acc, val) => {
    const [opponent, my] = val.split(' ')
    let choice = 0
    if (my === 'X') {
      choice = 1
    } else if (my === 'Y') {
      choice = 2
    } else {
      choice = 3
    }
    let win = 0;
    if ((opponent === 'A' && my === 'X') || (opponent === 'B' && my === 'Y') || (opponent === 'C' && my === 'Z')) {
      win = 3
    } else if ((opponent === 'A' && my === 'Y') || (opponent === 'B' && my === 'Z') || (opponent === 'C' && my === 'X')) {
      win = 6
    }
    const round = choice + win;
    if (debug) {
      console.log({ round, choice, win })
    }
    acc += round;
    return acc;
  }, 0).toString()
  report(`Solution 1${test ? ' (for test input)' : ''}:`, solution)
  console.timeEnd('part 1')
}

async function solveForSecondStar(
  input: string,
  inputAsArray: Array<any>,
  test: boolean,
  debug: boolean
) {
  console.time('part 2')

  const solution = inputAsArray.reduce((acc, val) => {
    const [opponent, end] = val.split(' ')
    let win = 0;
    let my = ''
    if (end === 'X') {
      if (opponent === 'A') {
        my = 'Z'
      } else if (opponent === 'B') {
        my = 'X'
      } else {
        my = 'Y'
      }
    } else if (end === 'Y') {
      if (opponent === 'A') {
        my = 'X'
      } else if (opponent === 'B') {
        my = 'Y'
      } else {
        my = 'Z'
      }
      win = 3
    } else {
      if (opponent === 'A') {
        my = 'Y'
      } else if (opponent === 'B') {
        my = 'Z'
      } else {
        my = 'X'
      }
      win = 6
    }
    let choice = 0
    if (my === 'X') {
      choice = 1
    } else if (my === 'Y') {
      choice = 2
    } else {
      choice = 3
    }
    const round = choice + win;
    if (debug) {
      console.log({ round, choice, win })
    }
    acc += round;
    return acc;
  }, 0).toString()
  report(`Solution 2${test ? ' (for test input)' : ''}:`, solution)
  console.timeEnd('part 2')
}
