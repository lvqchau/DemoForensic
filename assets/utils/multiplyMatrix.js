function _multiplyMatrix(originalArrayOne, originalArrayTwo) {
  let arrayOne = [...originalArrayOne];
  let arrayTwo = [...originalArrayTwo];

  let result = new Array(arrayOne.length).fill(0).map(() => new Array(arrayTwo[0].length).fill(0));
 
  return result.map((row, i) => {
    return row.map((val, j) => {
        return arrayOne[i].reduce((sum, elm, k) => sum + (elm*arrayTwo[k][j]) ,0)
    })
  })
}