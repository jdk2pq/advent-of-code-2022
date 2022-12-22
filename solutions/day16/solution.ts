import { read } from 'promise-path'
import { arrToNumberArr, reportGenerator, sortNumbers } from '../../util'

const report = reportGenerator(__filename)

export async function run(day: string) {
  const input = (await read(`solutions/${day}/input.txt`, 'utf8')).trim()

  const testInput = 'Valve AA has flow rate=0; tunnels lead to valves DD, II, BB\n' +
    'Valve BB has flow rate=13; tunnels lead to valves CC, AA\n' +
    'Valve CC has flow rate=2; tunnels lead to valves DD, BB\n' +
    'Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE\n' +
    'Valve EE has flow rate=3; tunnels lead to valves FF, DD\n' +
    'Valve FF has flow rate=0; tunnels lead to valves EE, GG\n' +
    'Valve GG has flow rate=0; tunnels lead to valves FF, HH\n' +
    'Valve HH has flow rate=22; tunnel leads to valve GG\n' +
    'Valve II has flow rate=0; tunnels lead to valves AA, JJ\n' +
    'Valve JJ has flow rate=21; tunnel leads to valve II'
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
  const solution = 'UNSOLVED'
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
