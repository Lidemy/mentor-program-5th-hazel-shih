function solve(lines) {
  if (lines[0] === reverse(lines[0])) {
    console.log('True')
  } else {
    console.log('False')
  }
}

function reverse(str) {
  let ans = ''
  for (let i = str.length - 1; i >= 0; i--) {
    ans += str[i]
  }
  return ans
}

solve('abbbba')
