// From: [1,2,3,4,5]
/* To:
  [
    [1 0 0 0 0],
    [0 2 0 0 0],
    [0 0 3 0 0],
    [0 0 0 4 0],
    [0 0 0 0 5],
  ]
*/
function _diag(array1D) {
  let w = array1D.length || 0;
  if (w === 0) return [];

  let tmpArr = Array(w).fill(0).map(() => Array.from({length:w}, () => 0)) //Initial Coefficients
  for (let i = 0; i < w; i++) {
    tmpArr[i][i] = array1D[i]
  }

  return tmpArr
}