function solve(lines) {
  const numberList = lines.slice(1, lines.length).map((n) => Number(n))
  for (let i = 0; i < numberList.length; i++) {
    console.log(isPrimeOrNot(numberList[i]))
  }
}

function isPrimeOrNot(n) {
  if (n === 1) {
    return 'Composite'
  } else {
    for (let i = 2; i < n; i++) {
      if (n % i === 0) {
        return 'Composite'
      }
    }
    return 'Prime'
  }
}

solve(['5', '1', '2', '3', '4', '5'])
