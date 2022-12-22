import { read } from 'promise-path'
import { arrToNumberArr, reportGenerator, sortNumbers } from '../../util'

const report = reportGenerator(__filename)

export async function run(day: string) {
  const input = (await read(`solutions/${day}/input.txt`, 'utf8')).trim()

  const testInput = '$ cd /\n' +
    '$ ls\n' +
    'dir a\n' +
    '14848514 b.txt\n' +
    '8504156 c.dat\n' +
    'dir d\n' +
    '$ cd a\n' +
    '$ ls\n' +
    'dir e\n' +
    '29116 f\n' +
    '2557 g\n' +
    '62596 h.lst\n' +
    '$ cd e\n' +
    '$ ls\n' +
    '584 i\n' +
    '$ cd ..\n' +
    '$ cd ..\n' +
    '$ cd d\n' +
    '$ ls\n' +
    '4060174 j\n' +
    '8033020 d.log\n' +
    '5626152 d.ext\n' +
    '7214296 k'
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
  const directories = {};
  const currentDirectory: string[] = [];
  inputAsArray.forEach((commandOrFile) => {
    if (commandOrFile.startsWith('$')) {
      if (commandOrFile.includes('cd ')) {
        if (!commandOrFile.includes('..')) {
          currentDirectory.push(commandOrFile.replace('$ cd ', ''))
        } else {
          currentDirectory.pop()
        }
      }
    } else {
      const dir = `/${currentDirectory.slice(1).join('/')}`
      if (directories[dir] === undefined) {
        directories[dir] = []
      }
      const [sizeOrType, file] = commandOrFile.split(' ')
      if (sizeOrType === 'dir') {
        directories[dir].push(file)
      } else {
        directories[dir].push(+sizeOrType)
      }
    }
    if (debug) {
      console.log({ commandOrFile, currentDirectory, directories })
    }
  })
  if (debug) {
    console.log('final')
    console.log({ currentDirectory, directories })
  }
  const dirSizes = {};
  Object.keys(directories).forEach((dir) => {
    if (directories[dir].every((file) => typeof file === 'number')) {
      dirSizes[dir] = directories[dir].reduce((a, b) => a + b, 0)
    }
  })
  // This was the trick to get things working, reversing the sort of the keys since the commands start at the root of the directory
  const solution = Object.keys(directories).reverse().reduce((acc, key) => {
    const dir = directories[key]
    let dirSize;
    if (dirSizes[key]) {
      dirSize = dirSizes[key]
    } else {
      dirSize = dir.reduce((a, b) => {
        if (typeof b === 'string') {
          const subDirKey = `${key === '/' ? '' : key}/${b}`
          const size = dirSizes[subDirKey]
          if (!size) {
            throw Error(`No size for ${subDirKey}`)
          }
          return a + size
        }
        return a + b
      }, 0)
    }
    if (debug) {
      console.log({ dir, dirSize, key, dirSizes })
    }
    if (dirSize < 100000) {
      acc += dirSize
    }
    dirSizes[key] = dirSize
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
  const directories = {};
  const currentDirectory: string[] = [];
  inputAsArray.forEach((commandOrFile) => {
    if (commandOrFile.startsWith('$')) {
      if (commandOrFile.includes('cd ')) {
        if (!commandOrFile.includes('..')) {
          currentDirectory.push(commandOrFile.replace('$ cd ', ''))
        } else {
          currentDirectory.pop()
        }
      }
    } else {
      const dir = `/${currentDirectory.slice(1).join('/')}`
      if (directories[dir] === undefined) {
        directories[dir] = []
      }
      const [sizeOrType, file] = commandOrFile.split(' ')
      if (sizeOrType === 'dir') {
        directories[dir].push(file)
      } else {
        directories[dir].push(+sizeOrType)
      }
    }
    if (debug) {
      console.log({ commandOrFile, currentDirectory, directories })
    }
  })
  if (debug) {
    console.log('final')
    console.log({ currentDirectory, directories })
  }
  const dirSizes: {[key: string]: number} = {};
  Object.keys(directories).forEach((dir) => {
    if (directories[dir].every((file) => typeof file === 'number')) {
      dirSizes[dir] = directories[dir].reduce((a, b) => a + b, 0)
    }
  })
  // This was the trick to get things working, reversing the sort of the keys since the commands start at the root of the directory
  Object.keys(directories).reverse().forEach((key) => {
    const dir = directories[key]
    let dirSize;
    if (dirSizes[key]) {
      dirSize = dirSizes[key]
    } else {
      dirSize = dir.reduce((a, b) => {
        if (typeof b === 'string') {
          const subDirKey = `${key === '/' ? '' : key}/${b}`
          const size = dirSizes[subDirKey]
          if (!size) {
            throw Error(`No size for ${subDirKey}`)
          }
          return a + size
        }
        return a + b
      }, 0)
    }
    if (debug) {
      console.log({ dir, dirSize, key, dirSizes })
    }
    dirSizes[key] = dirSize
  });

  const totalSpaceAvailable = 70000000
  const spaceNeededForUpdate = 30000000
  const totalSpaceUsed = dirSizes['/'];

  const spaceNeededToBeFreed = spaceNeededForUpdate - (70000000 - totalSpaceUsed);
  if (debug) {
    console.log({ totalSpaceUsed, spaceNeededToBeFreed, dirSizes })
  }
  const solution = Math.min(...Object.values(dirSizes).filter((size) => size >= spaceNeededToBeFreed)).toString()
  report(`Solution 2${test ? ' (for test input)' : ''}:`, solution)
  console.timeEnd('part 2')
}
