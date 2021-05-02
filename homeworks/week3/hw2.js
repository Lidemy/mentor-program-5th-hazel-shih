function solve(lines) {
  const temp = lines[0].split(' ')
  const start = Number(temp[0])
  const end = Number(temp[1])

  for (let i = start; i <= end; i++) {
    if (i === countNarcissistic(i)) {
      console.log(i)
    }
  }
}

function countNarcissistic(k) {
  let result = 0
  let kValue = k
  while (kValue > 0) {
    const remain = kValue % 10
    result += remain ** digitCount(k)
    kValue = (kValue - remain) / 10
  }
  return result
}

function digitCount(n) {
  let ans = 0
  while (n > 0) {
    n = Math.floor(n / 10)
    ans += 1
  }
  return ans
}

solve(['5', '200'])
