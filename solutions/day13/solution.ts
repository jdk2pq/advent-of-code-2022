import { read } from 'promise-path'
import { arrToNumberArr, reportGenerator, sortNumbers } from '../../util'
import { type } from 'os'

const report = reportGenerator(__filename)

export async function run(day: string) {
  const input = (await read(`solutions/${day}/input.txt`, 'utf8')).trim()

  const testInput = '[1,1,3,1,1]\n' +
    '[1,1,5,1,1]\n' +
    '\n' +
    '[[1],[2,3,4]]\n' +
    '[[1],4]\n' +
    '\n' +
    '[9]\n' +
    '[[8,7,6]]\n' +
    '\n' +
    '[[4,4],4,4]\n' +
    '[[4,4],4,4,4]\n' +
    '\n' +
    '[7,7,7,7]\n' +
    '[7,7,7]\n' +
    '\n' +
    '[]\n' +
    '[3]\n' +
    '\n' +
    '[[[]]]\n' +
    '[[]]\n' +
    '\n' +
    '[1,[2,[3,[4,[5,6,7]]]],8,9]\n' +
    '[1,[2,[3,[4,[5,6,0]]]],8,9]'
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
  let sum = 0;

  for (let i = 0; i < inputAsArray.length; i += 3) {
    const pair1: Array<any> = JSON.parse(inputAsArray[i])
    const pair2: Array<any> = JSON.parse(inputAsArray[i + 1])
    const flattened1 = pair1.flat(Infinity)
    const flattened2 = pair2.flat(Infinity)
    const smallerLeftSide = flattened1.find((value, idx) => {
      if (flattened2[idx] !== undefined) {
        return value < flattened2[idx]
      }
    })
    const smallerRightSide = flattened1.find((value, idx) => {
      if (flattened2[idx] !== undefined) {
        return value > flattened2[idx]
      }
    })
    if (smallerLeftSide || (!smallerRightSide && flattened1.length < flattened2.length) || (!smallerRightSide && flattened1.length === flattened2.length)) {
      if (debug) {
        console.log({ smallerLeftSide, smallerRightSide, pair1, pair2, flattened1, flattened2, sum, i: (i / 3) + 1 })
      }
      sum += (i / 3) + 1
    }
  }
  const solution = sum.toString()
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
  const solution = 'UNSOLVED'
  report(`Solution 2${test ? ' (for test input)' : ''}:`, solution)
  console.timeEnd('part 2')
}
