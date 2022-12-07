import { read } from 'promise-path'
import { arrToNumberArr, reportGenerator, sortNumbers } from '../../util'

const report = reportGenerator(__filename)

export async function run(day: string) {
  const input = (await read(`solutions/${day}/input.txt`, 'utf8')).trim()

  const testInput = 'mjqjpqmgbljsphdztnvjfqwrcgsmlb'
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
  const split = input.split('')
  let solution = 'UNSOLVED'
  for (let i = 0; i < split.length; i++) {
    const group = split.slice(i, i + 4)
    const unique = group.filter((item, index) => group.indexOf(item) === index)
    if (debug) {
      console.log({ group, unique })
    }
    if (unique.length === 4) {
      solution = (i + 4).toString()
      break;
    }
  }
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
  const split = input.split('')
  let solution = 'UNSOLVED'
  for (let i = 0; i < split.length; i++) {
    const group = split.slice(i, i + 14)
    const unique = group.filter((item, index) => group.indexOf(item) === index)
    if (debug) {
      console.log({ group, unique })
    }
    if (unique.length === 14) {
      solution = (i + 14).toString()
      break;
    }
  }

  report(`Solution 2${test ? ' (for test input)' : ''}:`, solution)
  console.timeEnd('part 2')
}
