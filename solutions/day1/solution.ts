import { read } from 'promise-path'
import { reportGenerator } from '../../util'

const report = reportGenerator(__filename)

export async function run(day: string) {
  const input = (await read(`solutions/${day}/input.txt`, 'utf8')).trim()

  const testInput = '1000\n' +
    '2000\n' +
    '3000\n' +
    '\n' +
    '4000\n' +
    '\n' +
    '7000\n' +
    '8000\n' +
    '9000\n' +
    '\n' +
    '5000\n' +
    '6000\n' +
    '\n' +
    '10000'
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
  let max = 0;
  let weight = 0;
  inputAsArray.forEach((val) => {
    if (val) {
      weight += Number(val);
    } else {
      if (weight > max) {
        if (debug) {
          console.log(`previous max: ${ max }`);
          console.log(`new max: ${ weight }`);
        }
        max = weight;
      }
      weight = 0;
    }
  })
  const solution = max.toString();
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
  let totals: number[] = [];
  let weight = 0;
  inputAsArray.forEach((val) => {
    if (val) {
      weight += Number(val);
    } else {
      totals.push(weight);
      weight = 0;
    }
  })
  totals.push(weight);

  if (debug) {
    console.log(totals.sort((a, b) => b - a).slice(0, 3))
  }
  const solution =  totals.sort((a, b) => b - a).slice(0, 3).reduce((acc, val) => acc += val).toString();
  report(`Solution 2${test ? ' (for test input)' : ''}:`, solution)
  console.timeEnd('part 2')
}
