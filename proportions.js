// Оценка сложности задачи: 3
// Предварительная оценка трудозатрат: 30 минут
// Фактические трудозатраты: 1 час (исследовал как замерить используемую оперативную память)

// Функция для пересчета долей в процентное выражение с точностью до трех знаков после запятой
// Сложность алгоритма O - 2n
// Оценка необходимой памяти: 7.5b/1 input item - 0.5b/1 input item
function calculateProportions(proportions) {
    const MAX_PROPORTIONS_COUNT = 5000000 // согласно тестам
    // Проверяем размер массива
    if (proportions.length > MAX_PROPORTIONS_COUNT) {
      console.warn('ERROR: Input is too large')
      return []
    }

    // Форматирование числа с точностью до трех знаков после запятой
    const formatPercent = number => number.toFixed(3)

    // Считаем сумму долей
    const sum = proportions.reduce((acc, proportion) => {
        return acc + Number(proportion)
    }, 0)

    // Переводим доли в проценты
    return proportions.map(proportion => formatPercent(proportion / sum * 100))
}


// TEST CALCULATIONS
const input = [
    '1.5', '3', '6', '1.5'
];
const expected = [
    '12.500', '25.000', '50.000', '12.500'
];

// Функция для сравнения массивов https://gist.github.com/ain/8645033
Array.prototype.compare = function(array) {
    if (!array) {
      return false;
    }
    if (this.length !== array.length) {
      return false;
    }
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] instanceof Array && array[i] instanceof Array) {
        if (!this[i].compare(array[i])) {
          return false;
        }
      }
      else if (this[i] !== array[i]) {
        return false;
      }
    }
    return true;
}

const calculated = calculateProportions(input)

console.log('TEST CALCULATIONS:')
if (calculated.compare(expected)) {
    console.log('SUCCESS', calculated)
} else {
    console.warn('FAIL', calculated, expected)
}


// TEST MAX INPUT SIZE
const generatePropotions = count => {
  const proportions = []
  // Округлить цисло до ближайшего 0.5
  const round = num => Math.round(num * 2) / 2
  const getRandomProportion = () => round(Math.random() * 20)

  for (let i=0; i<count; i++) {
    proportions.push(String(getRandomProportion()))
  }

  return proportions
}

console.log('TEST MAX INPUT SIZE:')

// 100
var proportions_count = 100
var proportions = generatePropotions(proportions_count)
var start = new Date()
calculateProportions(proportions)
var end = new Date() - start
console.info('Execution time: %dms on %d proportions', end, proportions_count)

// 100 000
var proportions_count = 100000
var proportions = generatePropotions(proportions_count)
var start = new Date()
calculateProportions(proportions)
var end = new Date() - start
console.info('Execution time: %dms on %d proportions', end, proportions_count)

// 5 000 000
var proportions_count = 5000000
var proportions = generatePropotions(proportions_count)
var start = new Date()
calculateProportions(proportions)
var end = new Date() - start
console.info('Execution time: %dms on %d proportions', end, proportions_count)

// 5 000 001
var proportions_count = 5000001
var proportions = generatePropotions(proportions_count)
var start = new Date()
calculateProportions(proportions)
var end = new Date() - start
console.info('Execution time: %dms on %d proportions', end, proportions_count)



// Функция печатает количество используемой оперативной памяти MB
function printRamUsage() {
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
}