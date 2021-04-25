function capitalize(str) {
  let firstWord = str.slice(0,1);
  let firstWordAscii = firstWord.charCodeAt();
  let ans = "";
  if(firstWordAscii >= 65 && firstWordAscii <= 122){
    ans += firstWord.toUpperCase() + str.slice(1,str.length);
    return ans;
  } else {
    return str;
  }
}

console.log(capitalize(',hello'));
