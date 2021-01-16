/*From: [
      [1,2],
      [3,4],
      [5,6],
      [7,8]
    ]
  ]  
*/
/*
  To: [
    [1,3,5,7],
    [2,4,6,8]
  ]
*/

function _transpose2D(originalArr) {
  let arr = [...originalArr];

  let w = arr.length || 0;
  let h = arr[0] instanceof Array ? arr[0].length : 0;

  let transArr = Array(h).fill(0).map(() => Array.from({length:w}, () => 0));

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      transArr[i][j] = arr[j][i];
    }
  }
  return transArr;
}