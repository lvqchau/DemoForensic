function _transpose1D(originalArr, start, end) {
  let arr = [...originalArr.slice(start, end+1)];

  let w = arr.length || 0;
  let h = arr[0] instanceof Array ? arr[0].length : 0;
  
  if (w == 0) return [];

  let transArr = Array(w).fill(0).map(() => Array.from({length:h+1}, () => 0));
  arr.forEach((item, index) => {
    transArr[index][0] = item;
  })

  return transArr;
}