import { read } from 'promise-path'
import { reportGenerator } from '../../util'

const report = reportGenerator(__filename)

export async function run(day: string) {
  const input = (await read(`solutions/${day}/input.txt`, 'utf8')).trim()

  const testInput = 'R 4\n' +
    'U 4\n' +
    'L 3\n' +
    'D 1\n' +
    'R 4\n' +
    'D 1\n' +
    'L 5\n' +
    'R 2'
  const testInputAsArray = testInput.split('\n')
  const testInput2 = 'R 5\n' +
    'U 8\n' +
    'L 8\n' +
    'D 3\n' +
    'R 17\n' +
    'D 10\n' +
    'L 25\n' +
    'U 20'
  const testInputAsArray2 = testInput2.split('\n')

  const inputAsArray = input.split('\n')

  await solveForFirstStar(testInput, testInputAsArray, true, false)
  await solveForFirstStar(input, inputAsArray, false, false)
  await solveForSecondStar(testInput, testInputAsArray, true, true)
  await solveForSecondStar(testInput2, testInputAsArray2, true, false)
  await solveForSecondStar(input, inputAsArray, false, false)
}

async function solveForFirstStar(
  input: string,
  inputAsArray: Array<any>,
  test: boolean,
  debug: boolean
) {
  console.time('part 1')
  const visited = new Set()
  visited.add('0,0')
  const tail = [0, 0]
  const head = [0, 0]

  function isAdjacent() {
    return Math.abs(head[0] - tail[0]) <= 1 && Math.abs(head[1] - tail[1]) <= 1
  }
  inputAsArray.forEach((move) => {
    const [direction, distance] = move.split(' ')
    for (let i = 0; i < distance; i++) {
      switch (direction) {
        case 'U':
          head[1]++
          break
        case 'D':
          head[1]--
          break
        case 'R':
          head[0]++
          break
        case 'L':
          head[0]--
          break
      }

      // lol this is wrong but it works 🤷‍️
      if (!isAdjacent()) {
        if (head[1] - tail[1] === 2) {
          tail[1] = head[1] - 1
          tail[0] = head[0]
        } else if (head[1] - tail[1] === -2) {
          tail[1] = head[1] + 1
          tail[0] = head[0]
        } else if (head[0] - tail[0] === 2) {
          tail[0] = head[0] - 1
          tail[1] = head[1]
        } else if (head[0] - tail[0] === -2) {
          tail[0] = head[0] + 1
          tail[1] = head[1]
        } else {
          switch (direction) {
            case 'U':
              tail[1]++
              break
            case 'D':
              tail[1]--
              break
            case 'R':
              tail[0]++
              break
            case 'L':
              tail[0]--
              break
          }
        }
      }
      if (debug){
        console.log({ head, tail })
      }
      visited.add(tail.join(','))
    }
  })
  const solution = visited.size.toString()
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
  const visited: Set<string> = new Set()
  visited.add('0,0')
  const snake = {
    0: [0, 0],
    1: [0, 0],
    2: [0, 0],
    3: [0, 0],
    4: [0, 0],
    5: [0, 0],
    6: [0, 0],
    7: [0, 0],
    8: [0, 0],
    9: [0, 0],
  }

  function isAdjacent(a, b) {
    return Math.abs(snake[a][0] - snake[b][0]) <= 1 && Math.abs(snake[a][1] - snake[b][1]) <= 1
  }
  inputAsArray.forEach((move) => {
    const [direction, distance] = move.split(' ')
    for (let i = 0; i < distance; i++) {
      switch (direction) {
        case 'U':
          snake[0][1]++
          break
        case 'D':
          snake[0][1]--
          break
        case 'R':
          snake[0][0]++
          break
        case 'L':
          snake[0][0]--
          break
      }
      // this is the right way to do it
      for (let j = 1; j < 10; j++) {
        if (!isAdjacent(j - 1, j)) {
          if (snake[j - 1][1] - snake[j][1] === 2) {
            if (snake[j - 1][0] !== snake[j][0] && snake[j - 1][1] !== snake[j][1]) {
              if (snake[j - 1][0] > snake[j][0]) {
                snake[j][0]++
              } else {
                snake[j][0]--
              }
            }
            snake[j][1]++
            if (debug) {
              console.log('up', j)
            }
          } else if (snake[j - 1][1] - snake[j][1] === -2) {
            snake[j][1]--
            if (snake[j - 1][0] !== snake[j][0] && snake[j - 1][1] !== snake[j][1]) {
              if (snake[j - 1][0] > snake[j][0]) {
                snake[j][0]++
              } else {
                snake[j][0]--
              }
            }
            if (debug) {
              console.log('down', j)
            }
          } else if (snake[j - 1][0] - snake[j][0] === 2) {
            snake[j][0]++
            if (snake[j - 1][0] !== snake[j][0] && snake[j - 1][1] !== snake[j][1]) {
              if (snake[j - 1][1] > snake[j][1]) {
                snake[j][1]++
              } else {
                snake[j][1]--
              }
            }
            if (debug) {
              console.log('right', j)
            }
          } else if (snake[j - 1][0] - snake[j][0] === -2) {
            snake[j][0]--
            if (snake[j - 1][0] !== snake[j][0] && snake[j - 1][1] !== snake[j][1]) {
              if (snake[j - 1][1] > snake[j][1]) {
                snake[j][1]++
              } else {
                snake[j][1]--
              }
            }
            if (debug) {
              console.log('left', j)
            }
          } else {
            if (debug) {
              console.log('normal', j)
            }
            switch (direction) {
              case 'U':
                snake[j][1]++
                break
              case 'D':
                snake[j][1]--
                break
              case 'R':
                snake[j][0]++
                break
              case 'L':
                snake[j][0]--
                break
            }
          }
        }
        if (j === 9) {
          visited.add(snake[j].join(','))
        }
      }
      if (debug) {
        console.log({ snake })
      }
    }
  })
  if (debug) {
    const xValues = Array.from(visited).map((v) => +v.split(',')[0])
    const yValues = Array.from(visited).map((v) => +v.split(',')[1])
    const minX = Math.min(...xValues)
    const maxX = Math.max(...xValues)
    const minY = Math.min(...yValues)
    const maxY = Math.max(...yValues)
    for (let y = minY; y <= maxY; y++) {
      let line = ''
      for (let x = minX; x <= maxX; x++) {
        if (visited.has(`${ x },${ y }`)) {
          line += '#'
        } else {
          line += '.'
        }
      }
      console.log(line)
    }
  }
  const solution = visited.size.toString()
  report(`Solution 2${test ? ' (for test input)' : ''}:`, solution)
  console.timeEnd('part 2')
}
