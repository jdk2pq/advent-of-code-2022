import { read } from 'promise-path'
import { arrToNumberArr, reportGenerator, sortNumbers } from '../../util'
import { range } from 'lodash';

const report = reportGenerator(__filename)

export async function run(day: string) {
  const input = (await read(`solutions/${day}/input.txt`, 'utf8')).trim()

  const testInput = '2-4,6-8\n' +
    '2-3,4-5\n' +
    '5-7,7-9\n' +
    '2-8,3-7\n' +
    '6-6,4-6\n' +
    '2-6,4-8'
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
    const [one, two] = val.split(',')
    const [start, finish] = one.split('-')
    const [start2, finish2] = two.split('-')
    const arr = range(start, +finish + 1)
    const arr2 = range(start2, +finish2 + 1)
    if (debug) {
      console.log({ arr, arr2 })
    }
    if (arr.every((val) => arr2.includes(val)) || arr2.every((val) => arr.includes(val))) {
      acc += 1;
    }
    return acc;
  }, 0)
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
    const [one, two] = val.split(',')
    const [start, finish] = one.split('-')
    const [start2, finish2] = two.split('-')
    const arr = range(start, +finish + 1)
    const arr2 = range(start2, +finish2 + 1)
    if (debug) {
      console.log({ arr, arr2 })
    }
    if (arr.some((val) => arr2.includes(val)) || arr2.some((val) => arr.includes(val))) {
      acc += 1;
    }
    return acc;
  }, 0)
  report(`Solution 2${test ? ' (for test input)' : ''}:`, solution)
  console.timeEnd('part 2')
}
