function findCircle(srcMat) {
  // circle detection code
  let desMat = srcMat.clone();
  let circlesMat = new cv.Mat();

  cv.cvtColor(srcMat, srcMat, cv.COLOR_RGBA2GRAY);
  cv.HoughCircles(srcMat, circlesMat, cv.HOUGH_GRADIENT, 1, 45, 75, 40, 0, 0);
  for (let i = 0; i < circlesMat.cols; ++i) {
    // draw circles
    let x = circlesMat.data32F[i * 3];
    let y = circlesMat.data32F[i * 3 + 1];
    let radius = circlesMat.data32F[i * 3 + 2];
    let center = new cv.Point(x, y);

    // draw circles
    cv.circle(desMat, center, radius, [0, 0, 0, 255], 3);
  }
  // console.log(desMat.cols)
  circlesMat.delete();
  return desMat;
}