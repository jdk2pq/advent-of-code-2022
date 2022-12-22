import { read } from 'promise-path'
import { arrToNumberArr, reportGenerator, sortNumbers } from '../../util'

const report = reportGenerator(__filename)

export async function run(day: string) {
  const input = (await read(`solutions/${day}/input.txt`, 'utf8')).trim()

  const testInput = 'Monkey 0:\n' +
    '  Starting items: 79, 98\n' +
    '  Operation: new = old * 19\n' +
    '  Test: divisible by 23\n' +
    '    If true: throw to monkey 2\n' +
    '    If false: throw to monkey 3\n' +
    '\n' +
    'Monkey 1:\n' +
    '  Starting items: 54, 65, 75, 74\n' +
    '  Operation: new = old + 6\n' +
    '  Test: divisible by 19\n' +
    '    If true: throw to monkey 2\n' +
    '    If false: throw to monkey 0\n' +
    '\n' +
    'Monkey 2:\n' +
    '  Starting items: 79, 60, 97\n' +
    '  Operation: new = old * old\n' +
    '  Test: divisible by 13\n' +
    '    If true: throw to monkey 1\n' +
    '    If false: throw to monkey 3\n' +
    '\n' +
    'Monkey 3:\n' +
    '  Starting items: 74\n' +
    '  Operation: new = old + 3\n' +
    '  Test: divisible by 17\n' +
    '    If true: throw to monkey 0\n' +
    '    If false: throw to monkey 1'
  const testInputAsArray = testInput.split('\n')

  const inputAsArray = input.split('\n')

  await solveForFirstStar(testInput, testInputAsArray, true, true)
  await solveForFirstStar(input, inputAsArray, false, false)
  await solveForSecondStar(testInput, testInputAsArray, true, true)
  await solveForSecondStar(input, inputAsArray, false, false)
}

type Monkey = {
  items: Array<number>,
  operation: (oldValue: number) => number,
  test: (newValue: number) => boolean,
  inspectionNumber: number,
  divisibleBy: number
}

async function solveForFirstStar(
  input: string,
  inputAsArray: Array<any>,
  test: boolean,
  debug: boolean
) {
  console.time('part 1')
  const monkeys: Monkey[] = []

  for (let i = 0; i < inputAsArray.length; i += 7) {
    const items = inputAsArray[i + 1].split(': ')[1].split(', ').map(Number)
    const [operation, value] = inputAsArray[i + 2].split('old ')[1].split(' ')
    const divisibleBy = +inputAsArray[i + 3].split('by ')[1]
    const throwToIfTrue = +inputAsArray[i + 4].split('monkey ')[1]
    const throwToIfFalse = +inputAsArray[i + 5].split('monkey ')[1]
    console.log({items, operation, value, divisibleBy, throwToIfTrue, throwToIfFalse})

    monkeys.push({
      inspectionNumber: 0,
      divisibleBy,
      items,
      operation: (oldValue: number) => {
        switch (operation) {
          case '*':
            return oldValue * (value === 'old' ? oldValue : Number(value))
          case '+':
            return oldValue + (value === 'old' ? oldValue : Number(value))
          case '-':
            return oldValue - (value === 'old' ? oldValue : Number(value))
          case '/':
            return oldValue / (value === 'old' ? oldValue : Number(value))
        }
      },
      test: (newValue: number) => {
        if (newValue % divisibleBy === 0) {
          monkeys[throwToIfTrue].items.push(newValue)
        } else {
          monkeys[throwToIfFalse].items.push(newValue)
        }
      }
    } as Monkey)
  }

  for (let i = 0; i < 20; i++) {
    monkeys.forEach(monkey => {
      monkey.items.forEach((item) => {
        monkey.inspectionNumber++;
        let tempWorry = monkey.operation(item);
        tempWorry = Math.floor(tempWorry / 3)
        monkey.test(tempWorry)
      })
      monkey.items = []
    })
  }

  console.log({monkeys})
  const inspectionLevels = monkeys.map(monkey => monkey.inspectionNumber)
  const max = Math.max(...inspectionLevels)
  const secondMax = Math.max(...inspectionLevels.filter(level => level !== max))
  const solution = (max * secondMax).toString()
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
  const monkeys: Monkey[] = []

  for (let i = 0; i < inputAsArray.length; i += 7) {
    const items = inputAsArray[i + 1].split(': ')[1].split(', ').map(Number)
    const [operation, value] = inputAsArray[i + 2].split('old ')[1].split(' ')
    const divisibleBy = +inputAsArray[i + 3].split('by ')[1]
    const throwToIfTrue = +inputAsArray[i + 4].split('monkey ')[1]
    const throwToIfFalse = +inputAsArray[i + 5].split('monkey ')[1]
    console.log({items, operation, value, divisibleBy, throwToIfTrue, throwToIfFalse})

    monkeys.push({
      inspectionNumber: 0,
      divisibleBy,
      items,
      operation: (oldValue: number) => {
        switch (operation) {
          case '*':
            return oldValue * (value === 'old' ? oldValue : Number(value))
          case '+':
            return oldValue + (value === 'old' ? oldValue : Number(value))
          case '-':
            return oldValue - (value === 'old' ? oldValue : Number(value))
          case '/':
            return oldValue / (value === 'old' ? oldValue : Number(value))
        }
      },
      test: (newValue: number) => {
        if (newValue % divisibleBy === 0) {
          monkeys[throwToIfTrue].items.push(newValue)
        } else {
          monkeys[throwToIfFalse].items.push(newValue)
        }
      }
    } as Monkey)
  }

  const divisibleBy = monkeys.reduce((acc, monkey) => {
    acc *= monkey.divisibleBy
    return acc;
  }, 1)

  for (let i = 0; i < 10000; i++) {
    monkeys.forEach(monkey => {
      monkey.items.forEach((item) => {
        monkey.inspectionNumber++;
        let tempWorry = monkey.operation(item) % divisibleBy;
        monkey.test(tempWorry)
      })
      monkey.items = []
    })
  }

  console.log({monkeys})
  console.log({worries: monkeys.map(monkey => monkey.items)})
  const inspectionLevels = monkeys.map(monkey => monkey.inspectionNumber)
  const max = Math.max(...inspectionLevels)
  const secondMax = Math.max(...inspectionLevels.filter(level => level !== max))
  const solution = (max * secondMax).toString()
  report(`Solution 2${test ? ' (for test input)' : ''}:`, solution)
  console.timeEnd('part 2')
}
