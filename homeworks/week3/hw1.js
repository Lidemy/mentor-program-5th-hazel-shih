function printStars(lines) {
  const layer = Number(lines[0])
  let ans = ''
  for (let i = 1; i <= layer; i++) {
    ans += '*'
    console.log(ans)
  }
}

printStars([5])
