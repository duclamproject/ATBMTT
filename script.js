// ĐỔI SANG NHỊ PHÂN
function chuyenNhiPhan(num) {
  let arr = [];
  let tmp = 0;
  while (num > 0) {
    tmp = num % 2;
    num = Math.floor(num / 2);
    arr.unshift(tmp);
  }
  return arr;
}

// BÌNH PHƯƠNG VÀ NHÂN
function tinhBeta(sP, a, alpha) {
  let arr_a = chuyenNhiPhan(a);
  let p = 1;
  for (let i = 0; i < arr_a.length; i++) {
    if (arr_a[i] == 0) {
      p = p * p;
      p = p % sP;
    } else {
      p = p * p;
      p = p % sP;
      p = p * alpha;
      p = p % sP;
    }
  }
  return p;
}
function checkSNT(x) {
  for (let i = 2; i < x; i++) {
    if (x % i === 0) {
      return 0;
    }
  }
  return 1;
}

// EUCLIDE MỞ RỘNG:
function oClit(k, p) {
  let ri = p;
  let rin = k;
  let tst = 0,
    ts = 1;
  let tin;
  let tmp;
  let gtmp;
  while (rin > 1) {
    tin = tst - ts * Math.floor(ri / rin);
    tmp = rin;
    rin = ri - rin * Math.floor(ri / rin);
    ri = tmp;
    gtmp = ts;
    ts = tin;
    tst = gtmp;
  }
  if (tin < 0) {
    tin = tin + p;
  }
  return tin;
}

// BETA, PUBLIC KEY, PRIMARY KEY
function result() {
  const soP = parseInt(document.querySelector("#so-p").value);
  const soA = parseInt(document.querySelector("#so-a").value);
  const soAlpha = parseInt(document.querySelector("#so-alpha").value);
  if (isNaN(soA) || isNaN(soP) || isNaN(soAlpha)) {
    alert("Vui lòng nhập đủ thông tin p, a, alpha!");
    return;
  }
  if (checkSNT(soP) == false) {
    document.querySelector("#so-p").value = NaN;
    document.querySelector("#so-a").value = NaN;
    document.querySelector("#so-alpha").value = NaN;
    alert("Nhập lại số p( p là số nguyên tố)!)");
    document.querySelector("#beta").innerHTML = "Beta: *********";
    document.querySelector("#k-pub").innerHTML = "Public key: *********";
    document.querySelector("#k-pr").innerHTML = "Private key: *********";
  }
  let gTriBeta = tinhBeta(soP, soA, soAlpha);
  document.querySelector("#beta").innerHTML = "Beta: " + gTriBeta;
  document.querySelector("#k-pub").innerHTML =
    "Public key = { " + soP + ", " + soAlpha + ", " + gTriBeta + " }";
  document.querySelector("#k-pr").innerHTML = "Private key = { ********* }";
}
//HIỂN THỊ PRIMARY KEY
function showPrimaryKey() {
  const soP = parseInt(document.querySelector("#so-p").value);
  const soA = parseInt(document.querySelector("#so-a").value);
  const soAlpha = parseInt(document.querySelector("#so-alpha").value);
  if (isNaN(soA) || isNaN(soP) || isNaN(soAlpha)) {
    alert("Vui lòng nhập đủ thông tin p, a, alpha!");
    return;
  }
  document.querySelector("#k-pr").innerHTML = "Primary key = { " + soA + " }";
}
// ẨN PRIMARY KEY
function anPrimaryKey() {
  const soP = parseInt(document.querySelector("#so-p").value);
  const soA = parseInt(document.querySelector("#so-a").value);
  const soAlpha = parseInt(document.querySelector("#so-alpha").value);
  if (isNaN(soA) || isNaN(soP) || isNaN(soAlpha)) {
    alert("Vui lòng nhập đủ thông tin p, a, alpha!");
    return;
  }
  document.querySelector("#k-pr").innerHTML = "Private key = { ********* }";
}

// RANDOM KEY

function randomKey() {
  // RANDOM đến khi thỏa mãn P là số nguyên tố
  const soP = document.querySelector("#so-p").value;
  let soP_ky_rd = Math.floor(Math.random() * 10000000);
  while (!checkSNT(soP_ky_rd)) {
    soP_ky_rd = Math.floor(Math.random() * 10000000);
  }
  let soA_ky_rd = Math.floor(Math.random() * (soP_ky_rd - 2));
  if (soA_ky_rd < 2) {
    soA_ky_rd = soA_ky_rd + 2;
  }
  let soAlpha_ky_rd = Math.floor(Math.random() * soP_ky_rd);
  if (soAlpha_ky_rd == 0) {
    soAlpha_ky_rd = soAlpha_ky_rd + 1;
  }

  let gTriBeta = tinhBeta(soP_ky_rd, soA_ky_rd, soAlpha_ky_rd);
  document.querySelector("#beta").innerHTML = "Beta: " + gTriBeta;
  document.querySelector("#k-pub").innerHTML =
    "Public key = { " +
    soP_ky_rd +
    ", " +
    soAlpha_ky_rd +
    ", " +
    gTriBeta +
    " }";
  document.querySelector("#k-pr").innerHTML =
    "Private key = { " + soA_ky_rd + " }";
  document.querySelector("#so-p").value = soP_ky_rd;
  document.querySelector("#so-a").value = soA_ky_rd;
  document.querySelector("#so-alpha").value = soAlpha_ky_rd;
}
// const btnRamdom = document.querySelector("#ramdom");
document.querySelector("#ramdom").addEventListener("click", randomKey);
// TÍNH GAMA - Deta
function gama_xicma() {
  const soAlpha_ky = parseInt(document.querySelector("#so-alpha").value);
  const soK_ky = parseInt(document.querySelector("#so-k").value);
  const soP_ky = parseInt(document.querySelector("#so-p").value);
  const soX_ky = parseInt(document.querySelector("#so-x").value);
  const soA_ky = parseInt(document.querySelector("#so-a").value);
  if (isNaN(soX_ky) || isNaN(soK_ky)) {
    alert("Vui lòng nhập đầy thông tin x và k!");
    return;
  }
  // Gama
  let gTriGama = tinhBeta(soP_ky, soK_ky, soAlpha_ky);
  if (isNaN(gTriGama)) {
    alert("Còn thiếu thông tin của p, a, alpha!");

    return;
  }
  document.querySelector("#gama").innerHTML = "Gama: " + gTriGama;
  //Deta
  let gTriXicma_turn_1 = Number(soX_ky - soA_ky * gTriGama);
  console.log(gTriXicma_turn_1);
  let gTriXicma_turn_2 = oClit(soK_ky, soP_ky - 1);
  console.log(gTriXicma_turn_2);
  let gTriXicma_turn_3 = Number(gTriXicma_turn_1 * gTriXicma_turn_2);
  console.log(gTriXicma_turn_3);
  let gTriXicma = gTriXicma_turn_3 % (soP_ky - 1);
  if (gTriXicma < 0) {
    gTriXicma = gTriXicma + (soP_ky - 1);
  }
  if (isNaN(gTriXicma)) {
    alert("Còn thiếu thông tin của p, a, alpha!");
    return;
  }
  document.querySelector("#xicma").innerHTML = "Deta: " + gTriXicma;
}
// Kiểm tra
function kiemTraChuKy() {
  const soP = parseInt(document.querySelector("#so-p").value);
  const soA = parseInt(document.querySelector("#so-a").value);
  const soAlpha = parseInt(document.querySelector("#so-alpha").value);
  const soAlpha_ky = parseInt(document.querySelector("#so-alpha").value);
  const soK_ky = parseInt(document.querySelector("#so-k").value);
  const soP_ky = parseInt(document.querySelector("#so-p").value);
  const soX_ky = parseInt(document.querySelector("#so-x").value);
  const soA_ky = parseInt(document.querySelector("#so-a").value);
  if (
    isNaN(soA) ||
    isNaN(soP) ||
    isNaN(soAlpha) ||
    isNaN(soK_ky) ||
    isNaN(soX_ky)
  ) {
    alert("Vui lòng thực hiện theo trình tự các bước!");
    return;
  }
  //   BETA
  let gTriBeta = tinhBeta(soP, soA, soAlpha);
  //   GAMA
  let gTriGama = tinhBeta(soP_ky, soK_ky, soAlpha_ky);
  let gTriXicma_turn_1 = Number(soX_ky - soA_ky * gTriGama);
  console.log(gTriXicma_turn_1);
  let gTriXicma_turn_2 = oClit(soK_ky, soP_ky - 1);
  console.log(gTriXicma_turn_2);
  let gTriXicma_turn_3 = Number(gTriXicma_turn_1 * gTriXicma_turn_2);
  console.log(gTriXicma_turn_3);
  //   XICMA
  let gTriXicma = gTriXicma_turn_3 % (soP_ky - 1);
  if (gTriXicma < 0) {
    gTriXicma = gTriXicma + (soP_ky - 1);
  }
  let check_VP = tinhBeta(soP_ky, soX_ky, soAlpha); //132
  let check_VT_Beta = tinhBeta(soP_ky, gTriGama, gTriBeta);
  let check_VT_Gama = tinhBeta(soP_ky, gTriXicma, gTriGama);
  let check_VT_Start = check_VT_Beta * check_VT_Gama;
  let check_VT_End = check_VT_Start % soP_ky;
  if (check_VT_End == check_VP) {
    document.querySelector("#check").innerHTML =
      "Result: Văn bản chưa bị thay đổi";
  } else {
    document.querySelector("#check").innerHTML =
      "Result: Văn bản đã bị thay đổi";
  }
}
