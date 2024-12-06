export const numeroPorExtenso = (numero, c) => {
  const ex = [
    ["Zero", "Um", "Dois", "Três", "Quatro", "Cinco", "Seis", "Sete", "Oito", "Nove", "Dez", "Onze", "Doze", "Treze", "Quatorze", "Quinze", "Dezesseis", "Dezessete", "Dezoito", "Dezenove"],
    ["Dez", "Vinte", "Trinta", "Quarenta", "Cinquenta", "Sessenta", "Setenta", "Oitenta", "Noventa"],
    ["Cem", "Cento", "Duzentos", "Trezentos", "Quatrocentos", "Quinhentos", "Seiscentos", "Setecentos", "Oitocentos", "Novecentos"],
    ["Mil", "Milhão", "Bilhão", "Trilhão", "Quadrilhão", "Quintilhão", "Sextilhão", "Setilhão", "Octilhão", "Nonilhão", "Decilhão", "Undecilhão", "Dodecilhão", "Tredecilhão", "Quatrodecilhão", "Quindecilhão", "Sedecilhão", "Septendecilhão", "Octencilhão", "Nonencilhão"]
  ];

  let e = " e ", $ = "Real", d = "Centavo", n, inteiro, centavos;
  
  // Divide a parte inteira e os centavos
  n = numero.replace(c ? /[^,\d]/g : /\D/g, "").split(",");
  
  // Separa a parte inteira e decimal (centavos)
  inteiro = n[0];
  centavos = n[1] ? n[1].padEnd(2, "0") : null;  // Garante que sempre haja dois dígitos nos centavos

  const r = [];
  
  // Lida com a parte inteira
  const v = inteiro.replace(/^0+/, "").padStart(3, "0").match(/\d{3}/g) || [];

  for (let i = 0; i < v.length; i++) {
    let num = v[i] * 1;
    let t = "";

    if (num % 100 < 20) {
      t += ex[0][num % 100];
    } else {
      t += ex[1][Math.floor(num % 100 / 10) - 1] + (num % 10 ? e + ex[0][num % 10] : "");
    }

    r.push(
      (num < 100
        ? t
        : num % 100 === 0
        ? ex[2][Math.floor(num / 100)]
        : ex[2][Math.floor(num / 100)] + e + t) +
      (i < v.length - 1 ? " " + (num > 1 ? ex[3][v.length - i - 2].replace("ão", "ões") : ex[3][v.length - i - 2]) : "")
    );
  }

  // Adiciona a palavra "Real" ou "Reais"
  let result = r.length > 1 ? r.join(e) : r[0] || ex[0][0];
  if (result) {
    result += inteiro * 1 > 1 ? " Reais" : " Real";
  }

  // Lida com os centavos
  if (centavos && centavos !== "00") {
    let cent = parseInt(centavos, 10);
    let centavosTexto = "";

    if (cent < 20) {
      centavosTexto = ex[0][cent];
    } else {
      centavosTexto = ex[1][Math.floor(cent / 10) - 1] + (cent % 10 ? e + ex[0][cent % 10] : "");
    }

    result += e + centavosTexto + (cent > 1 ? " Centavos" : " Centavo");
  }

  return result;
};
