function _mergeColumnArray(arrOfArrays) {
  let arrWidth = arrOfArrays.length;
  let w = arrOfArrays[0].length || 0;
  if (w === 0) return [];

  let transArr = Array(w).fill(0).map(() => Array.from({length:arrWidth}, () => 0));
  for (let i = 0; i < arrWidth; i++) {
    for (let j = 0; j < w; j++) {
      transArr[j][i] = arrOfArrays[i][j][0]
    }
  }

  return transArr
}