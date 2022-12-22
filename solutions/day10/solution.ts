import { read } from 'promise-path'
import { arrToNumberArr, reportGenerator, sortNumbers } from '../../util'

const report = reportGenerator(__filename)

export async function run(day: string) {
  const input = (await read(`solutions/${day}/input.txt`, 'utf8')).trim()

  const testInput = 'noop\n' +
    'addx 3\n' +
    'addx -5'
  const testInputAsArray = testInput.split('\n')
  const testInput2 = 'addx 15\n' +
    'addx -11\n' +
    'addx 6\n' +
    'addx -3\n' +
    'addx 5\n' +
    'addx -1\n' +
    'addx -8\n' +
    'addx 13\n' +
    'addx 4\n' +
    'noop\n' +
    'addx -1\n' +
    'addx 5\n' +
    'addx -1\n' +
    'addx 5\n' +
    'addx -1\n' +
    'addx 5\n' +
    'addx -1\n' +
    'addx 5\n' +
    'addx -1\n' +
    'addx -35\n' +
    'addx 1\n' +
    'addx 24\n' +
    'addx -19\n' +
    'addx 1\n' +
    'addx 16\n' +
    'addx -11\n' +
    'noop\n' +
    'noop\n' +
    'addx 21\n' +
    'addx -15\n' +
    'noop\n' +
    'noop\n' +
    'addx -3\n' +
    'addx 9\n' +
    'addx 1\n' +
    'addx -3\n' +
    'addx 8\n' +
    'addx 1\n' +
    'addx 5\n' +
    'noop\n' +
    'noop\n' +
    'noop\n' +
    'noop\n' +
    'noop\n' +
    'addx -36\n' +
    'noop\n' +
    'addx 1\n' +
    'addx 7\n' +
    'noop\n' +
    'noop\n' +
    'noop\n' +
    'addx 2\n' +
    'addx 6\n' +
    'noop\n' +
    'noop\n' +
    'noop\n' +
    'noop\n' +
    'noop\n' +
    'addx 1\n' +
    'noop\n' +
    'noop\n' +
    'addx 7\n' +
    'addx 1\n' +
    'noop\n' +
    'addx -13\n' +
    'addx 13\n' +
    'addx 7\n' +
    'noop\n' +
    'addx 1\n' +
    'addx -33\n' +
    'noop\n' +
    'noop\n' +
    'noop\n' +
    'addx 2\n' +
    'noop\n' +
    'noop\n' +
    'noop\n' +
    'addx 8\n' +
    'noop\n' +
    'addx -1\n' +
    'addx 2\n' +
    'addx 1\n' +
    'noop\n' +
    'addx 17\n' +
    'addx -9\n' +
    'addx 1\n' +
    'addx 1\n' +
    'addx -3\n' +
    'addx 11\n' +
    'noop\n' +
    'noop\n' +
    'addx 1\n' +
    'noop\n' +
    'addx 1\n' +
    'noop\n' +
    'noop\n' +
    'addx -13\n' +
    'addx -19\n' +
    'addx 1\n' +
    'addx 3\n' +
    'addx 26\n' +
    'addx -30\n' +
    'addx 12\n' +
    'addx -1\n' +
    'addx 3\n' +
    'addx 1\n' +
    'noop\n' +
    'noop\n' +
    'noop\n' +
    'addx -9\n' +
    'addx 18\n' +
    'addx 1\n' +
    'addx 2\n' +
    'noop\n' +
    'noop\n' +
    'addx 9\n' +
    'noop\n' +
    'noop\n' +
    'noop\n' +
    'addx -1\n' +
    'addx 2\n' +
    'addx -37\n' +
    'addx 1\n' +
    'addx 3\n' +
    'noop\n' +
    'addx 15\n' +
    'addx -21\n' +
    'addx 22\n' +
    'addx -6\n' +
    'addx 1\n' +
    'noop\n' +
    'addx 2\n' +
    'addx 1\n' +
    'noop\n' +
    'addx -10\n' +
    'noop\n' +
    'noop\n' +
    'addx 20\n' +
    'addx 1\n' +
    'addx 2\n' +
    'addx 2\n' +
    'addx -6\n' +
    'addx -11\n' +
    'noop\n' +
    'noop\n' +
    'noop\n'
  const testInputAsArray2 = testInput2.split('\n')

  const inputAsArray = input.split('\n')

  // await solveForFirstStar(testInput, testInputAsArray, true, true)
  await solveForFirstStar(testInput2, testInputAsArray2, true, true)
  await solveForFirstStar(input, inputAsArray, false, false)
  await solveForSecondStar(testInput2, testInputAsArray2, true, true)
  await solveForSecondStar(input, inputAsArray, false, false)
}

async function solveForFirstStar(
  input: string,
  inputAsArray: Array<any>,
  test: boolean,
  debug: boolean
) {
  console.time('part 1')
  let commandIdx = 0;
  let waitingCount = 0;
  let register = 1;
  const trackedValues: number[] = []
  for (let i = 1; i <= 220; i++) {
    const command = inputAsArray[commandIdx]
    if ([20, 60, 100, 140, 180, 220].includes(i)) {
      trackedValues.push(register * i);
    }
    if (command === 'noop') {
      commandIdx++;
    } else {
      const [_, amount] = command.split(' ');
      if (waitingCount === 1) {
        waitingCount = 0;
        commandIdx++;
        register += Number(amount);
      } else {
        waitingCount++;
      }
    }
    if (debug) {
      console.log({ i, command, register, waitingCount })
    }
  }
  const solution = trackedValues.reduce((acc, val) => acc + val, 0).toString()
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
  let commandIdx = 0;
  let waitingCount = 0;
  let register = 1;
  let line = ''
  for (let i = 0; i <= 239; i++) {
    const command = inputAsArray[commandIdx]
    // trick was figuring out i had to use %40 here
    if (register === (i % 40) || Math.abs(register - (i % 40)) === 1) {
      line += '#'
    } else {
      line += '.'
    }
    if (command === 'noop') {
      commandIdx++;
    } else {
      const [_, amount] = command.split(' ');
      if (waitingCount === 1) {
        waitingCount = 0;
        commandIdx++;
        register += Number(amount);
      } else {
        waitingCount++;
      }
    }
    if (line.length === 40) {
      console.log(line)
      line = '';
    }
    // if (debug) {
    //   console.log({ i, command, register, waitingCount })
    // }
  }
  // report(`Solution 2${test ? ' (for test input)' : ''}:`, solution)
  console.timeEnd('part 2')
}
