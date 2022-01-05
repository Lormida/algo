// Linked list

/* function LinkedList() {
  this.head = null
  this.tail = null
}

function Node(value, next, prev) {
  this.value = value
  this.next = next
  this.prev = prev
}


LinkedList.prototype.addToHeadList = function (value) {
  let newNode = new Node(value, this.head, null)
  if (this.head) this.head.prev = newNode
  else this.tail = newNode

  this.head = newNode
}

LinkedList.prototype.addToTailList = function (value) {
  let newNode = new Node(value, null, this.tail)
  if (this.head) this.tail.next = newNode
  else this.tail = newNode

  this.tail = newNode
}

LinkedList.prototype.removeLastNode = function () {
  if (!this.tail) return null
  let val = this.tail.value
  if (this.head == this.tail) {
    this.head = this.tail = null
  } else {
    let temp = this.tail.prev
    temp.next = null
    this.tail = null
    this.tail = temp
  }
  return val
}

LinkedList.prototype.removeFirstNode = function () {
  if (!this.head) return null
  let val = this.head.value
  this.head = this.head.next
  if (this.head) this.head.prev = null
  else this.tail = null
  return val
}

LinkedList.prototype.removeLastNode = function () {
  if (!this.tail) return null
  let val = this.tail.value
  this.tail = this.tail.prev
  if (this.tail) this.tail.next = null
  else this.head = null
  return val
}


LinkedList.prototype.listHasValue = function (value) {
  let currentNode = this.head
  while (currentNode) {
    if (currentNode.value == value) return true
    currentNode = currentNode.next
  }
  return false
}

LinkedList.prototype.indexOf = function (value) {
  let currentNode = this.head
  let iter = 0
  let indexes = []
  while (currentNode) {
    if (currentNode.value == value) indexes.push(iter)
    currentNode = currentNode.next
    iter++
  }
  return indexes
}

let ll = new LinkedList()
ll.addToHeadList(300)
ll.addToHeadList(200)
ll.addToHeadList(100)
ll.addToTailList(400)
ll.addToTailList(100)
ll.addToTailList(500)


console.log(ll.listHasValue(200)) // true
console.log(ll.listHasValue(600)) // false
console.log(ll) // [100,200,300,400,100,500]
console.log(ll.indexOf(100)) // [0,4] */

// Binary search

/* function BST(value) {
  this.value = value
  this.left = null
  this.right = null
}
function log(value) {
  console.log('val : ', value)
}

BST.prototype.contains = function (value) {
  if (value == this.value) return true
  let turn = value > this.value ? 'right' : 'left'

  if (turn == 'right' && this.right) return this.right.contains(value)
  else if (turn == 'left' && this.left) return this.left.contains(value)
  else return false
}

BST.prototype.insert = function (value) {
  if (value >= this.value) {
    if (!this.right) this.right = new BST(value)
    else this.right.insert(value)
  }
  if (value < this.value) {
    if (!this.left) this.left = new BST(value)
    else this.left.insert(value)
  }
}

BST.prototype.depthTraversal = function (iterator, typeOrder) {

  if (typeOrder == 'pre-order') {
    // pre-order
    iterator(this.value)
    if (this.left) this.left.depthFirstTraversal(iterator, typeOrder)
    if (this.right) this.right.depthFirstTraversal(iterator, typeOrder)
  }
  else if (typeOrder == 'post-order') {
    // post-order
    if (this.left) this.left.depthFirstTraversal(iterator, typeOrder)
    if (this.right) this.right.depthFirstTraversal(iterator, typeOrder)
    iterator(this.value)
  } else {
    // asc
    if (this.left) this.left.depthFirstTraversal(iterator, typeOrder)
    iterator(this.value)
    if (this.right) this.right.depthFirstTraversal(iterator, typeOrder)
  }
}

BST.prototype.breadthTraversal = function (iterator) {
  const queue = [this]
  function traversalFn(root) {
    if (root.left) queue.push(root.left)
    if (root.right) queue.push(root.right)

    if (queue.length) {
      let nextNode = queue.shift()
      log(nextNode.value)
      traversalFn(nextNode)
    }
  }
  traversalFn(this)
}

BST.prototype.getMinVal = function () {
  if (!this.left) return this.value
  return this.left.getMinVal()
}

BST.prototype.getMaxVal = function () {
  if (!this.right) return this.value
  return this.right.getMaxVal()
}

let root = new BST(50)
root.insert(30)
root.insert(70)
root.insert(45)
root.insert(20)
root.insert(10)
root.insert(35)
root.insert(60)
root.insert(100)
root.insert(85)
root.insert(105)
root.insert(59)

root.depthFirstTraversal(log, 'post-order')
root.breadthTraversal(log)
console.log(root.contains(105))
console.log(root.getMinVal())
console.log(root.getMaxVal()) */

// Hash table

/* function HashTable(size) {
  this.bucket = new Array(size)
  this.bucketSize = size
}

function HashNode(key, value, next = null) {
  this.key = key
  this.value = value
  this.next = next
}
HashTable.prototype.hash = function (key) {
  let hash = 0
  for (let i = 0; i < key.length; i++) {
    hash += key.charCodeAt(i)
  }
  return hash % this.bucketSize
}
HashTable.prototype.insert = function (key, value) {
  let node = new HashNode(key, value)
  let hash = this.hash(key)

  if (!this.bucket[hash]) this.bucket[hash] = node
  else {
    let currentNode = this.bucket[hash]
    while (currentNode) {
      if (currentNode.key == key) {
        currentNode.value = value
        return
      }

      if (!currentNode.next) currentNode.next = node
      currentNode = currentNode.next
    }
  }
}
HashTable.prototype.get = function (key) {
  let hash = this.hash(key)
  if (!this.bucket[hash]) return null
  else {
    let currentNode = this.bucket[hash]
    while (currentNode) {
      if (currentNode.key == key) return currentNode.value
      currentNode = currentNode.next
    }
    return 'none'
  }
}
HashTable.prototype.retrieveAll = function () {
  let pairs = []
  function toPair(node) {
    pairs.push(`${node.key} : ${node.value}`)
  }
  for (let node of this.bucket) {
    while (node) {
      toPair(node)
      node = node.next
    }
  }
  return pairs
}

let table = new HashTable(30)
table.insert('Dane', 'dane@gmail.com')
table.insert('Andrew', 'andrew@gmail.com')
table.insert('Daen', 'daen@gmail.com')
table.insert('Dnae', 'Dnae@gmail.com')

table.insert('Andrew', 'future@gmail.com')
table.insert('Daen', 'EDITED DAEN')
// console.log(table)
// console.log(table.retrieveAll())
 */
// Algorithmes

// Fizz-Buzz

/* function FizzBuzz(num) {
  for (let i = 1; i <= num; i++) {
    if (!(i % 5) && !(i % 3)) {
      console.log('FizzBuzz')
    } else if (i % 3 == 0) {
      console.log('Fizz')
    } else if (i % 5 == 0) {
      console.log('Buzz')
    } else {
      console.log(i)
    }
  }
}
FizzBuzz(20)
 */

// Harmless Ransom Note
/* function harmlessRansomNote(noteText, magazineText) {
  let noteTextArray = noteText.split(' ')
  let magazineTextArray = magazineText.split(' ')
  let sourceDict = {}
  magazineTextArray.forEach(word => {
    if (!sourceDict[word]) sourceDict[word] = 1
    else {
      sourceDict[word]++
    }
  })
  for (let word of noteTextArray) {
    if (!sourceDict[word] || --sourceDict[word] < 0) return false
  }
  console.log(sourceDict)
  return true
}

console.log(harmlessRansomNote('from this is a secret note for you from a secret admirer',
  'puerto rico is a place of great wonder and excitement it has many secret waterfall locations that i am an admirer of you must hike quite a distance to find the secret places as they are far from populated areas but it is worth the effort a tip i have for you is to go early in the morning when it is not so hot out also note that you must wear hiking boots this is one of the best places i have ever visited')) */

// Palindrome

/*
function isPalindrome(line) {
  const aCodeSymbol = 'a'.charCodeAt(0)
  const zCodeSymbol = 'z'.charCodeAt(0)
  line = line
    .toLowerCase()
    .split('').filter(symbol => symbol.charCodeAt(0) >= aCodeSymbol && symbol.charCodeAt(0) <= zCodeSymbol)

  return line.join('') == line.reverse().join('')
}
 */
// console.log(isPalindrome("Madam, I'm, !AdAm"))

// Reverse words

/* function reverseWords(phrase) {
  let modifiedPhrase = ''
  for (let i = 0; i < phrase.length; i++) {
    modifiedPhrase += phrase[phrase.length - i - 1]
  }
  return modifiedPhrase
}
console.log(reverseWords('Coding JavaScript'))
 */

// Reverse Array In Place

/* function reverseArrayInPlace(arr) {
  let newArray = []
  let l = arr.length
  for (let i = 0; i < l / 2; i++) {
    newArray[i] = arr[l - i - 1]
    newArray[l - i - 1] = arr[i]
  }
  console.log(newArray)

}

reverseArrayInPlace([1, 2, 3, 4, 5]) */


// Collect sum

/* function collectSum(array, sum) {
  let results = []
  let originDict = {}
  array.forEach(digit => {
    if (!originDict[digit]) originDict[digit] = 1
    else originDict[digit]++
  })

  array.forEach(digit => {
    if (originDict[digit] && array.includes(sum - digit)) {
      results.push([digit, sum - digit])
      originDict[digit]--
      originDict[sum - digit]--
    }
  })
  return results
}

console.log(collectSum([1, 5, 2, 3, 4, 7, 6, 5], 9)) */

// Fibonacci
/*
function fibonacci(n) {
  if (n == 0) return 0
  if (n == 1) return 1
  return fibonacci(n - 1) + fibonacci(n - 2)
}

console.log(fibonacci(9)) */

// Caesar Cipher

/* function caesarCipher(str, num) {
  let strArray = str.split(' ')
  return strArray.map(word => word.split('').map(symbol => {
    if (symbol == symbol.toUpperCase()) return String.fromCharCode((symbol.charCodeAt(0) - 'a'.charCodeAt(0) + num) % 26 + 'a'.charCodeAt(0))
      .toUpperCase()
    return String.fromCharCode((symbol.charCodeAt(0) - 97 + num) % 26 + 97)
  }).join('')).join(' ')
}

console.log(caesarCipher('zoo Keeper', 2))
 */

// Fibonacci Memorized

/* const store = {}
function fibonacciMemorized(num, store) {
  if (num < 2) return 1
  if (store[num]) return store[num]
  let result = fibonacciMemorized(num - 1, store) + fibonacciMemorized(num - 2, store)
  store[num] = result
  return result
}

console.log(fibonacciMemorized(5, store)) */

// Mean Median Mode

/* function MeanMedianMode(array) {
  const getMean = array => (array.reduce((prev, cur) => prev + cur, 0) / array.length).toFixed(2)

  function getMedian(array) {
    const arraySorted = array.sort((a, b) => a - b)
    if (array.length % 2 == 1) return arraySorted[Math.floor(array.length / 2)]
    let median1 = arraySorted[array.length / 2]
    let median2 = arraySorted[array.length / 2 - 1]
    return (median1 + median2) / 2
  }
  function getMode(array) {
    let objectDict = {}
    array.forEach(word => {
      if (!objectDict[word]) objectDict[word] = 0
      objectDict[word]++
    })

    let maxFrequency = 0
    let wordFrequency = []
    array.forEach(word => {
      if (objectDict[word] > maxFrequency) {
        maxFrequency = objectDict[word]
        wordFrequency = [word]
      } else if (objectDict[word] == maxFrequency && !wordFrequency.includes(word)) {
        wordFrequency.push(word)
      }
    })
    if (wordFrequency.length == array.length) maxFrequency = null
    console.log(objectDict)
    return wordFrequency

  }
  return {
    'mean': getMean(array),
    'median': getMedian(array),
    'mode': getMode(array),
  }
}
 */
// console.log(MeanMedianMode([10, 23, 10, 15, 23, 9]))

// Binary Search

/* function binarySearch(array, value) {
  let mediumIdx = Math.floor(array.length / 2)
  let middleValue = array[mediumIdx]

  if (middleValue == value) return value
  if (array.length == 1) return null

  if (value < middleValue) {
    return binarySearch(array.slice(0, mediumIdx), value)
  } else if (value > middleValue) {
    return binarySearch(array.slice(mediumIdx, array.length), value)
  }
}
// console.log(binarySearch([5, 7, 12, 16, 36, 39, 42, 56, 71], 56)) */


// Max profit

/* function determineProfit(array) {
  let minPrice = array[0]
  let tomorrowPrice = array[1]
  let maxProfit = -1
  for (let i = 0; i < array.length - 1; i++) {
    tomorrowPrice = array[i + 1]
    if (tomorrowPrice - array[i] > maxProfit) {
      if (array[i] < minPrice) minPrice = array[i]
      maxProfit = tomorrowPrice - minPrice
    } else if (array[i + 1] - minPrice > maxProfit) maxProfit = tomorrowPrice - minPrice
  }
  return maxProfit

}
console.log(determineProfit([125, 50, 6, 10, 33, 25, 1]))
 */

// Sieve of Eratosthenes

function primeSieve(n) {
  let array = []
  for (let i = 1; i < n; i++) array[i] = i + 1

  for (let i = 2; i < Math.sqrt(n); i++) {
    array = array.map((num, index) => {
      if (index + 1 >= i ** 2 && num % i == 0) return false
      return num
    })
  }
  return array.filter(num => num != false)

}
console.log(primeSieve(120))
