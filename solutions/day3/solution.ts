import { read } from 'promise-path'
import { arrToNumberArr, reportGenerator, sortNumbers } from '../../util'

const report = reportGenerator(__filename)

export async function run(day: string) {
  const input = (await read(`solutions/${day}/input.txt`, 'utf8')).trim()

  const testInput = 'vJrwpWtwJgWrhcsFMMfFFhFp\n' +
    'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL\n' +
    'PmmdzqPrVvPwwTWBwg\n' +
    'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn\n' +
    'ttgJtRGJQctTZtZT\n' +
    'CrZsJsPPZsGzwwsLwLmpwMDw'
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
  const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const solution = inputAsArray.reduce((acc, val) => {
    const first = val.substring(0, val.length / 2)
    const second = val.substring(val.length / 2)
    if(debug) {
      console.log({ first, second })
    }
    const inCommon = first.split('').find((val) => {
      if (second.includes(val)) {
        return val
      }
    });
    if (debug) {
      console.log({ inCommon, num: alphabet.indexOf(inCommon) + 1 })
    }
    acc += alphabet.indexOf(inCommon) + 1;
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
  const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let solution = 0;

  for (let i = 0; i < inputAsArray.length; i += 3) {
    const first = inputAsArray[i]
    const second = inputAsArray[i + 1]
    const third = inputAsArray[i + 2]
    const inCommon = first.split('').find((val) => {
      if (second.includes(val) && third.includes(val)) {
        return val
      }
    });
    if (debug) {
      console.log({ inCommon, num: alphabet.indexOf(inCommon) + 1 })
    }
    solution += alphabet.indexOf(inCommon) + 1;
  }
  report(`Solution 2${test ? ' (for test input)' : ''}:`, solution.toString())
  console.timeEnd('part 2')
}
