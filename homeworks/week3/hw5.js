function solve(lines) {
  const group = lines
    .slice(1, lines.length)
    .map((n) => n.split(' '))
  for (let i = 0; i < group.length; i++) {
    let winner = null
    if (group[i][2] === '1') { // 比大
      if (group[i][0].length > group[i][1].length) {
        winner = 'A'
      } else if (group[i][0].length < group[i][1].length) {
        winner = 'B'
      } else {
        for (let j = 0; j < group[i][0].length; j++) {
          if (group[i][0][j] > group[i][1][j]) {
            winner = 'A'
            break
          } else if (group[i][0][j] < group[i][1][j]) {
            winner = 'B'
            break
          }
        }
      }
    }

    if (group[i][2] === '-1') { // 比小
      if (group[i][0].length < group[i][1].length) {
        winner = 'A'
      } else if (group[i][0].length > group[i][1].length) {
        winner = 'B'
      } else {
        for (let j = 0; j < group[i][0].length; j++) {
          if (group[i][0][j] < group[i][1][j]) {
            winner = 'A'
            break
          } else if (group[i][0][j] > group[i][1][j]) {
            winner = 'B'
            break
          }
        }
      }
    }
    if (winner === 'A' || winner === 'B') {
      console.log(winner)
    } else {
      console.log('DRAW')
    }
  }
}

solve(['3', '1 2 1', '1 2 -1', '2 2 1'])
