// deno-fmt-ignore-file

//public int testPoint(double real, double imaginary){
  //int escapeNumber = 0;
  //double zr = 0; double zi = 0;
  //double r, i;
  //while (escapeNumber < MAXITER){
    //escapeNumber++;
    //r = zr; i = zi;
    //if ((r*r + i*i) < ESCAPEBOUNDRY){
      //zr = r*r - i*i + real;
      //zi = 2*r*i + imaginary;
    //}else
      //return escapeNumber;//point outside set
  //}return 0;//point inside set
//}

const LIMIT = 200
const SCALE = Math.pow(2, 32)
const BOUNDARY = scale(4)
function isMember(real, imag) {
  let [zr, zi, distance, escape] = [0, 0, 0, 0]
  while (escape++ < LIMIT && distance < BOUNDARY) {
    [zr, zi] = [times(zr, zr) - times(zi, zi) + real, (2 * times(zr, zi)) + imag]
    distance = times(zr,zr) + times(zi,zi)
  }
  return distance < BOUNDARY
}

function times(a, b) {
  return Math.floor((a * b) / SCALE)
}

function range(start, stop, step = 1) {
  if (start === stop) return []
  if (start < stop && step < 0) return []
  if (start > stop && step > 0) return []
  return Array(Math.ceil((stop - start) / step))
    .fill(start)
    .map((x, y) => x + y * step)
}

function scale(x) {
  return Math.floor(x * SCALE)
}

var mb = ''
for (let x of range(-2, 0.5, 0.03125)) {
  for (let y of range(-1, 1, 0.03125)) {
    mb += +isMember(scale(x), scale(y))
  }
  mb += '\n'
}
console.log(mb)


//IS_MEMBER = 0 0 0 0 1 [ IS_MEMBER' ] GET_DISTANCE LIMIT LT

//REAL IMAG ZR ZI DISTANCE ESCAPE IS_MEMBER' = REAL IMAG ((ZR SQ) (ZI SQ) - REAL +) (2 ZR ZI MULT MULT IMAG +) (ZR SQ ZI SQ +) (ESCAPE INCR) continue? ((ESCAPE LIMIT LT) (DISTANCE BOUNDARY LT) AND)
//_ _ _ _ DISTANCE _ GET_DISTANCE = DISTANCE


//-1717986918
//-3006477107
