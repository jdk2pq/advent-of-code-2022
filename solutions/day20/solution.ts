import { read } from 'promise-path'
import { arrToNumberArr, reportGenerator, sortNumbers } from '../../util'
import cloneDeep from 'lodash/cloneDeep'

const report = reportGenerator(__filename)

export async function run(day: string) {
  const input = (await read(`solutions/${day}/input.txt`, 'utf8')).trim()

  const testInput = '1\n' +
    '2\n' +
    '-3\n' +
    '3\n' +
    '-2\n' +
    '0\n' +
    '4'
  const testInputAsArray = testInput.split('\n')

  const inputAsArray = input.split('\n')

  await solveForFirstStar(testInput, testInputAsArray, true, true)
  await solveForFirstStar(input, inputAsArray, false, false)
  // await solveForSecondStar(testInput, testInputAsArray, true, true)
  // await solveForSecondStar(input, inputAsArray, false, false)
}

async function solveForFirstStar(
  input: string,
  inputAsArray: Array<any>,
  test: boolean,
  debug: boolean
) {
  console.time('part 1')
  const originalNums = inputAsArray.map(Number).map(val => [val])
  const inputAsArrayToArrays = [...originalNums]
  originalNums.forEach((num) => {
    const index = inputAsArrayToArrays.indexOf(num)
    const spliceIndex = (index + num[0]) % inputAsArrayToArrays.length
    inputAsArrayToArrays.splice(index, 1);
    // if i put spliceIndex here instead of the right hand side of the variable,
    // this won't work. maybe i'm dumb and it's just late, but i'm confused...
    inputAsArrayToArrays.splice((index + num[0]) % inputAsArrayToArrays.length, 0, num);
    if (debug) {
      console.log({ index, spliceIndex, inputAsArrayToArrays, alternativeSpliceIndex: (index + num[0]) % inputAsArrayToArrays.length })
    }
  });
  if (debug) {
    console.log({ inputAsArrayToArrays });
  }
  const zeroIndex = inputAsArrayToArrays.findIndex((val) => val[0] === 0)
  if (debug) {
    console.log({ zeroIndex })
  }
  const iterations = [1000, 2000, 3000]
  const sum = iterations.reduce((acc, val) => {
    const index = (zeroIndex + val) % inputAsArrayToArrays.length
    const number = Number(inputAsArrayToArrays[index][0])
    acc += number
    if (debug) {
      console.log({ acc, number, index })
    }
    return acc;
  }, 0)

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
