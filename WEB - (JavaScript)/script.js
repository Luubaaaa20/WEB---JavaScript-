
console.log("=== Інструкція з використання функції triangle ===");
console.log("Формат виклику: triangle(value1, type1, value2, type2)");
console.log("Типи: 'leg', 'hypotenuse', 'opposite angle', 'adjacent angle', 'angle'");
console.log("---------------------------------------------------");

function degToRad(deg) {
  return deg * Math.PI / 180;
}
function radToDeg(rad) {
  return rad * 180 / Math.PI;
}

let a, b, c;         
let alpha, beta;     

function checkTriangle(a, b, c, alpha, beta) {
  if (a <= 0 || b <= 0 || c <= 0) {
    return "Zero or negative input";
  }
  if (a >= c || b >= c) {
    return "Cathetus cannot be >= hypotenuse";
  }
  if (alpha <= 0 || alpha >= 90 || beta <= 0 || beta >= 90) {
    return "Angle must be acute (0 < angle < 90)";
  }
  if (Math.abs((alpha + beta) - 90) > 0.001) {
    return "Angles do not sum to 90";
  }
  return "success";
}

function solveLegLeg(aVal, bVal) {
  a = aVal; 
  b = bVal;
  c = Math.sqrt(a*a + b*b);
  alpha = radToDeg(Math.asin(a/c));
  beta  = 90 - alpha;
}
function solveLegHypotenuse(aVal, cVal) {
  a = aVal;
  c = cVal;
  b = Math.sqrt(c*c - a*a);
  alpha = radToDeg(Math.asin(a/c));
  beta  = 90 - alpha;
}

function solveOppositeAngleLeg(alphaVal, aVal) {
  alpha = alphaVal;
  const alphaRad = degToRad(alpha);
  a = aVal;
  c = a / Math.sin(alphaRad);
  b = c * Math.cos(alphaRad);
  beta = 90 - alpha;
}

function solveAdjacentAngleLeg(betaVal, bVal) {
  beta = betaVal;
  const betaRad = degToRad(beta);
  b = bVal;
  c = b / Math.sin(betaRad);
  a = c * Math.cos(betaRad);
  alpha = 90 - beta;
}

function solveAngleHypotenuse(alphaVal, cVal) {
  alpha = alphaVal;
  const alphaRad = degToRad(alpha);
  c = cVal;
  a = c * Math.sin(alphaRad);
  b = c * Math.cos(alphaRad);
  beta = 90 - alpha;
}

function solveAdjacentAngleHypotenuse(betaVal, cVal) {
  beta = betaVal;
  const betaRad = degToRad(beta);
  c = cVal;
  b = c * Math.sin(betaRad); // бо b навпроти beta
  a = c * Math.cos(betaRad); // бо a навпроти alpha
  alpha = 90 - beta;
}

const combos = {
  "leg-leg":                 (v1, v2) => solveLegLeg(v1, v2),
  "leg-hypotenuse":          (v1, v2) => solveLegHypotenuse(v1, v2),
  "hypotenuse-leg":          (v1, v2) => solveLegHypotenuse(v2, v1),

  "opposite angle-leg":      (v1, v2) => solveOppositeAngleLeg(v1, v2),
  "leg-opposite angle":      (v1, v2) => solveOppositeAngleLeg(v2, v1),

  "adjacent angle-leg":      (v1, v2) => solveAdjacentAngleLeg(v1, v2),
  "leg-adjacent angle":      (v1, v2) => solveAdjacentAngleLeg(v2, v1),

  "angle-hypotenuse":        (v1, v2) => solveAngleHypotenuse(v1, v2),
  "hypotenuse-angle":        (v1, v2) => solveAngleHypotenuse(v2, v1),

  "adjacent angle-hypotenuse":   (v1, v2) => solveAdjacentAngleHypotenuse(v1, v2),
  "hypotenuse-adjacent angle":   (v1, v2) => solveAdjacentAngleHypotenuse(v2, v1),

  "opposite angle-hypotenuse":   (v1, v2) => solveAngleHypotenuse(v1, v2), 
  "hypotenuse-opposite angle":   (v1, v2) => solveAngleHypotenuse(v2, v1)
};

function triangle(value1, type1, value2, type2) {
  const validTypes = ["leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"];
  if (!validTypes.includes(type1) || !validTypes.includes(type2)) {
    console.log("Невірно задано тип аргументів. Перечитайте інструкцію.");
    return "failed";
  }

  const key = type1 + "-" + type2;
  const solver = combos[key];
  if (!solver) {
    console.log("Неможливо розв'язати трикутник за заданою парою типів. Перечитайте інструкцію.");
    return "failed";
  }

  solver(value1, value2);

  const checkResult = checkTriangle(a, b, c, alpha, beta);
  if (checkResult !== "success") {
    console.log(checkResult);
    return checkResult;
  }

  console.log("a =", a);
  console.log("b =", b);
  console.log("c =", c);
  console.log("alpha =", alpha);
  console.log("beta =", beta);
  return "success";
}
