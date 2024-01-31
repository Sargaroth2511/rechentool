const dezToHexTable = {
  0: "0",
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
  10: "A",
  11: "B",
  12: "C",
  13: "D",
  14: "E",
  15: "F",
};

const hexToBinTable = {
  0: "0000",
  1: "0001",
  2: "0010",
  3: "0011",
  4: "0100",
  5: "0101",
  6: "0110",
  7: "0111",
  8: "1000",
  9: "1001",
  A: "1010",
  B: "1011",
  C: "1100",
  D: "1101",
  E: "1110",
  F: "1111",
};

const swapTable = table => {
  const switchedTable = {};
  Object.keys(table).forEach(key => {
    switchedTable[table[key]] = key;
  });
  return switchedTable;
};

const checkInput = (input, type) => {
  if (type === "hex") {
    let regex = /^[0-9a-fA-F]+$/;
    if (!regex.test(input)) {
      return alert(
        "Es sind nur Ziffern von 0-9 und Buchstaben von a-e erlaubt"
      );
    }
  } else if (type === "bin") {
    let regex = /^[0-1]+$/;
    if (!regex.test(input)) {
      return alert("Es sind nur Ziffern von 0-1 erlaubt");
    }
  } else if (type === "dez") {
    let regex = /^[0-9]+$/;
    if (!regex.test(input)) {
      return alert("Es sind nur Ziffern von 0-9 erlaubt");
    }
  } else {
    return false;
  }
};

const dezToBin = (input, div) => {
  let number = Number(input);
  let result = [];
  while (number >= 1) {
    let initNr = number;
    let rest = (number / 2) % 1;
    number = Math.floor(number / 2);
    console.log(number, rest);
    const newContent = document.createElement("div");
    newContent.innerHTML =
      initNr + "/2 = " + number + " Rest = " + rest + " ==> *2 = " + rest * 2;
    div.appendChild(newContent);
    result.unshift(rest * 2);
  }
  return result.join("");
};

const dezToHex = (input, div) => {
  let number = Number(input);
  let result = [];
  while (number >= 1) {
    let initNr = number;
    let rest = (number / 16) % 1;
    number = Math.floor(number / 16);
    let hexNR = dezToHexTable[rest * 16];
    console.log(number, hexNR);
    result.unshift(hexNR);
    const newContent = document.createElement("div");
    newContent.innerHTML =
      initNr +
      "/16 = " +
      number +
      " Rest = " +
      rest +
      " ==> *16 = " +
      rest * 16 +
      " ==> " +
      hexNR;
    div.appendChild(newContent);
  }
  return result.join("");
};

const binToDez = (input, div) => {
  let bin = input.split("");
  let result = 0;
  for (let i = 0; i <= bin.length - 1; i++) {
    let number = Number(bin[bin.length - i - 1]);
    const newContent = document.createElement("div");
    newContent.innerHTML =
      "2 ^ " + i + " * " + number + " = " + 2 ** i * number;
    console.log("2 ^ " + i + " * " + number + " = " + 2 ** i * number);
    result += 2 ** i * number;
    div.appendChild(newContent);
  }
  return result;
};

const hexToDez = (input, div) => {
  const hexToDezTable = swapTable(dezToHexTable);
  let hex = input.toUpperCase().split("");
  let result = 0;
  for (let i = 0; i <= hex.length - 1; i++) {
    let number = hexToDezTable[hex[hex.length - i - 1]];
    const newContent = document.createElement("div");
    newContent.innerHTML =
      "16 ^ " + i + " * " + number + " = " + 16 ** i * number;
    result += 16 ** i * Number(number);
    div.appendChild(newContent);
  }
  return result;
};

const hexToBin = (input, div) => {
  let hex = input.toUpperCase().split("");
  result = [];
  for (let i = 0; i <= hex.length - 1; i++) {
    let number = hexToBinTable[hex[hex.length - i - 1]];
    const newContent = document.createElement("div");
    newContent.innerHTML = hex[hex.length - i - 1] + " ==> " + number;
    result.unshift(number);
    div.appendChild(newContent);
  }
  return result.join(".");
};

const binToHex = (input, div) => {
  const missingZeros = input.length % 4 === 0 ? 0 : 4 - (input.length % 4);
  input = "0".repeat(missingZeros) + input;
  let bitchunks = input.match(/.{4}/g);
  let binToHexTable = swapTable(hexToBinTable);
  result = [];
  for (let i = 0; i <= bitchunks.length - 1; i++) {
    let number = binToHexTable[bitchunks[bitchunks.length - i - 1]];
    const newContent = document.createElement("div");
    newContent.innerHTML =
      bitchunks[bitchunks.length - i - 1] + " ==> " + number;
    result.unshift(number);
    div.appendChild(newContent);
  }
  return result.join("");
};

const chooseCalculation = (input, inputType, outputType, div) => {
  if (inputType === outputType) return input;

  let conversion = inputType + "to" + outputType;

  console.log(conversion);
  switch (conversion) {
    case "deztobin":
      return dezToBin(input, div);
    case "deztohex":
      return dezToHex(input, div);
    case "bintodez":
      return binToDez(input, div);
    case "hextodez":
      return hexToDez(input, div);
    case "hextobin":
      return hexToBin(input, div);
    case "bintohex":
      return binToHex(input, div);
    default:
      // alert('Funktion noch nicht verfügbar')
      return "Funktion noch nicht vorhanden";
  }
};
const calculate = () => {
  const calculation = document.getElementById("calculation");
  const input = document.getElementById("inputNR").value;
  const inputType = document.getElementById("inputType").value;
  const outputType = document.getElementById("outputType").value;
  const output = document.getElementById("output");

  document.getElementById("calculation").innerHTML = "";
  // checkInput(input, inputType)
  checkInput(input, inputType);

  output.innerHTML = chooseCalculation(
    input,
    inputType,
    outputType,
    calculation
  );
};
