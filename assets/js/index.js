const getEle = (id) => {
  return document.getElementById(id);
}

let imgElement = getEle('imgSrc');
let inputElement = getEle('imgInput');
let canvasElement = getEle('imageCanvas');

inputElement.onchange = function() {
  imgElement.src = URL.createObjectURL(event.target.files[0]);
};

const getCurrentImage = () => {
  if (imgElement.src) {
    URL.revokeObjectURL(imgElement.src);
    let srcMat = cv.imread(imgElement);
    let desMat = srcMat.clone();
    cv.cvtColor(desMat, desMat, cv.COLOR_RGBA2GRAY);
    cv.imshow('imageCanvas', desMat);
    
    srcMat.delete();
  }
}

imgElement.onload = getCurrentImage;
getEle('reloadButton').onclick = getCurrentImage;

getEle('downloadButton').onclick = function() {
  if (imgElement.src) {
    this.href = getEle('imageCanvas').toDataURL();
    this.download = 'desImage.png';
  }
};


getEle('circlesButton').onclick = function() {
  // document.body.classList.add('loading');

  let srcMat = cv.imread('imageCanvas');
  let desMat = findCircle(srcMat);
  cv.imshow('imageCanvas', desMat);

  srcMat.delete();
  desMat.delete();

  // document.body.classList.remove('loading');
};

// Functionalities
const findCircle = (srcMat) => {
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