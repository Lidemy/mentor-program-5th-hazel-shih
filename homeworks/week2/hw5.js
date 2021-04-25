function join(arr, concatStr) {
  let ans = "";
  for (let i = 0; i < arr.length - 1; i++) {
    let temp = "";
    temp = arr[i] + concatStr;
    ans += temp;
  }
  ans += arr[arr.length - 1].toString();
  return ans;
}


function repeat(str, times) {
  let ans = "";
  for(let i = 1; i <= times; i++){
    ans += str;
  }
  return ans;
}

console.log(join(["a"], ','));
console.log(repeat('a', 5));
