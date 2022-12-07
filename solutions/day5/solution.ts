import { read } from 'promise-path'
import { arrToNumberArr, reportGenerator, sortNumbers } from '../../util'

const report = reportGenerator(__filename)

export async function run(day: string) {
  const input = (await read(`solutions/${day}/input.txt`, 'utf8')).trim()

  const testInput = '    [D]    \n' +
    '[N] [C]    \n' +
    '[Z] [M] [P]\n' +
    ' 1   2   3 \n' +
    '\n' +
    'move 1 from 2 to 1\n' +
    'move 3 from 1 to 3\n' +
    'move 2 from 2 to 1\n' +
    'move 1 from 1 to 2'
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
  const arrays: Array<Array<string>> = [];
  inputAsArray.forEach((line: string) => {
    if (line.includes('[')) {
      const arr: string[] = []
      for (let i = 0; i < line.length; i += 4) {
        if (line[i] === '[' && line[i + 2] === ']') {
          arr.push(line[i + 1])
        } else if (line[i] === ' ' && line[i + 1] === ' ' && line[i + 2] === ' ') {
          arr.push(line[i])
        }
        if (debug) {
          console.log({ arr, el: line[i], i })
        }
      }
      if (debug) {
        console.log({ arr })
      }
      arr.forEach((item, idx) => {
        if (item !== ' ') {
          if (arrays[idx] === undefined) {
            arrays[idx] = []
          }
          arrays[idx].unshift(item.replace('[', '').replace(']', ''))
        }
      })
    } else if (line.includes('move')) {
      const [_, numberToMove, __, from, ___, to] = line.split(' ')
      const fromIdx = +from - 1
      const toIdx = +to - 1
      let i = 0;
      while (i < +numberToMove) {
        const popped = arrays[fromIdx].pop()
        arrays[toIdx].push(popped!)
        i++;
      }
      if (debug) {
        console.log({ arrays, fromIdx, toIdx, numberToMove })
      }
    } else {
      if (debug) {
        console.log('start')
        console.log({ arrays })
      }
    }
  })
  if (debug) {
    console.log({ arrays })
  }
  const solution = arrays.reduce((acc, val) => {
    if (val[val.length - 1]) {
      acc += val[val.length - 1];
    }
    return acc
  }, '')
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
  const arrays: Array<Array<string>> = [];
  inputAsArray.forEach((line: string) => {
    if (line.includes('[')) {
      const arr: string[] = []
      for (let i = 0; i < line.length; i += 4) {
        if (line[i] === '[' && line[i + 2] === ']') {
          arr.push(line[i + 1])
        } else if (line[i] === ' ' && line[i + 1] === ' ' && line[i + 2] === ' ') {
          arr.push(line[i])
        }
        if (debug) {
          console.log({ arr, el: line[i], i })
        }
      }
      if (debug) {
        console.log({ arr })
      }
      arr.forEach((item, idx) => {
        if (item !== ' ') {
          if (arrays[idx] === undefined) {
            arrays[idx] = []
          }
          arrays[idx].unshift(item.replace('[', '').replace(']', ''))
        }
      })
    } else if (line.includes('move')) {
      const [_, numberToMove, __, from, ___, to] = line.split(' ')
      const fromIdx = +from - 1
      const toIdx = +to - 1
      let i = 0;
      let temp: string[] = []
      while (i < +numberToMove) {
        const popped = arrays[fromIdx].pop()
        temp.push(popped!);
        i++;
      }
      arrays[toIdx].push(...temp.reverse());
      if (debug) {
        console.log({ arrays, fromIdx, toIdx, numberToMove })
      }
    } else {
      if (debug) {
        console.log('start')
        console.log({ arrays })
      }
    }
  })
  if (debug) {
    console.log({ arrays })
  }
  const solution = arrays.reduce((acc, val) => {
    if (val[val.length - 1]) {
      acc += val[val.length - 1];
    }
    return acc
  }, '')
  report(`Solution 2${test ? ' (for test input)' : ''}:`, solution)
  console.timeEnd('part 2')
}
