function CFA() {
  /******* MAKE SIGNAL *******/
  // N = 128
  const N = 128

  // f = rand(1,N)
  let f = Array(128).fill(0).map(() => Math.random())

  // f = f - min(f)
  const curMin = Math.min(...f);
  f = f.map(cur => cur - curMin);

  // f = f/max(f)
  const curMax = Math.max(...f);
  f = f.map(cur => cur / curMax);

  // g = f
  let g = [...f];
  
  /******* ADD CORRELATION *******/
  for (let k = 2; k < N; k+=4) {
    g[k] = 0.5*f[k-1] + 0.5*f[k+1];
  }

  /******* EM *******/
  let alpha = Array(2).fill(0).map(() => Array.from({length:1}, () => Math.random())) //Initial Coefficients
  let sigma = 0.005; //variance on gaussian
  console.log('sigmaOld', sigma);
  let delta = 10; //uniform
  let r = new Array(N-1).fill(null);
  let w = new Array(N-1).fill(null);
  let a = false;

  while(a === false) {
    /******* E-STEP *******/
    for (let k = 1; k < N-1; k++) {
      r[k] = g[k] - (alpha[0]*g[k-1] + alpha[1]*g[k+1]);
      w[k] = Math.exp(-(r[k]**2/sigma)) / (Math.exp(-(r[k]**2/sigma)) + 1/delta);
    }

    /******* M-STEP *******/
    let transGOne = _transpose1D(g, 0, N-3);
    let transGTwo = _transpose1D(g, 2, N-1);
    let M = _mergeColumnArray([transGOne, transGTwo]);
    let b = _transpose1D(g, 1, N-2);
    r = r.slice(1, r.length)
    w = w.slice(1, w.length);
    let W = _diag(w);
    let transM = _transpose2D(M);

    let alpha_new = _multiplyMatrix(_multiplyMatrix(_multiplyMatrix(_inv(_multiplyMatrix(_multiplyMatrix(transM, W), M)),transM),W),b)
    let alpha_minus = alpha_new.map((item,index) => [alpha[index] - alpha_new[index]])

    let norm_alpha = Math.sqrt(alpha_minus.reduce((a, num) => a + ((2 * num) ** 2), 0));
    if (norm_alpha < 0.01) {
      break;
    }
    alpha = alpha_new

    let r_mul = r.map(item => item**2)
    let w_mul = w.map((item, i) => item*r_mul[i])
    let w_mul_sum = w_mul.reduce((a,b) => a+b, 0)
    let w_sum = w.reduce((a,b) => a+b, 0)
    sigma = w_mul_sum/w_sum;
  }

  console.log('sigmaNew', sigma);
}

CFA()