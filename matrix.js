// Mathematical functions:

// prototyping

//
function addMatrices(a, b) {
  var nrLinesA = a.length;
  var nrLinesB = b.length;
  var nrColumnsA = a[0].length;
  var nrColumnsB = b[0].length;

  if (nrLinesA != nrLinesB || nrColumnsA != nrColumnsB) {
    return "Cannot add matrices! For this specific operation, the matrices must have the same number of lines and columns, respectively";
  }
  var result = [];
  for (var i = 0; i < nrLinesA; i++) {
    result[i] = [];
    for (var j = 0; j < nrColumnsA; j++) {
      result[i][j] = a[i][j] + b[i][j];
    }
  }
  return result;
}

function subMatrices(a, b) {
  var nrLinesA = a.length;
  var nrLinesB = b.length;
  var nrColumnsA = a[0].length;
  var nrColumnsB = b[0].length;

  if (nrLinesA != nrLinesB || nrColumnsA != nrColumnsB) {
    return "Cannot substract matrices! For this specific operation, the matrices must have the same number of lines and columns, respectively";
  }
  var result = [];
  for (var i = 0; i < nrLinesA; i++) {
    result[i] = [];
    for (var j = 0; j < nrColumnsA; j++) {
      result[i][j] = a[i][j] - b[i][j];
    }
  }
  return result;
}

function multiplyMatrices(a, b) {
  var nrLinesA = a.length;
  var nrLinesB = b.length;
  var nrColumnsA = a[0].length;
  var nrColumnsB = b[0].length;

  if (nrColumnsA != nrLinesB) {
    return "Cannot multiply matrices! For this specific operation, the number of columns of the first matrix must be equal to the number of rows of the second matrix";
  }
  var result = [];
  for (var i = 0; i < nrLinesA; ++i) {
    result[i] = [];
    for (var j = 0; j < nrColumnsB; ++j) {
      result[i][j] = 0;
      for (var k = 0; k < nrColumnsA; ++k) {
        result[i][j] += a[i][k] * b[k][j];
      }
    }
    console.table(result);
  }
  return result;
}

// Functions designed to retrieve/pass data from/to the document:

function getMatrixFromDocument(letter) {
  var lines = document.getElementById("lines-" + letter).value;
  var columns = document.getElementById("columns-" + letter).value;

  var myMatrix = [];
  for (var i = 0; i < lines; i++) {
    myMatrix[i] = [];
    for (var j = 0; j < columns; j++) {
      var currentId = "";
      currentId = letter + i + j;
      myMatrix[i][j] = parseInt(document.getElementById(currentId).value);
    }
  }
  return myMatrix;
}

function validateMatrix(myMatrix) {
  var lines = myMatrix.length;
  var columns = myMatrix[0].length;

  for (var i = 0; i < lines; i++) {
    for (var j = 0; j < columns; j++) {
      if (isNaN(myMatrix[i][j])) {
        return false;
      }
    }
  }
  return true;
}

function generateMatrix(letter) {
  var lines = document.getElementById("lines-" + letter).value;
  var columns = document.getElementById("columns-" + letter).value;
  var container = document.getElementById("container-" + letter);

  while (container.hasChildNodes()) {
    container.removeChild(container.lastChild);
  }

  for (var i = 0; i < lines; i++) {
    for (var j = 0; j < columns; j++) {
      var input = document.createElement("input");
      input.type = "text";
      input.placeholder =
        letter.toLowerCase() + "[" + (i + 1) + "][" + (j + 1) + "]";
      input.id = letter + i + j;
      input.className = "smaller-input";
      container.appendChild(input);
    }
    container.appendChild(document.createElement("br"));
  }
}

function generateCInput(lines, columns) {
  var container = document.getElementById("container-C");

  var input = document.createElement("input");
  input.type = "text";
  input.id = "lines-C";
  input.value = document.getElementById(lines).value;
  container.appendChild(input);

  var input = document.createElement("input");
  input.type = "text";
  input.id = "columns-C";
  input.value = document.getElementById(columns).value;
  container.appendChild(input);
}

function populateMatrix(myMatrix) {
  var lines = myMatrix.length;
  var columns = myMatrix[0].length;

  for (var i = 0; i < lines; i++) {
    for (var j = 0; j < columns; j++) {
      var currentId = "C" + i + j;
      console.log(currentId);
      document.getElementById(currentId).value = myMatrix[i][j];
    }
  }
  return myMatrix;
}

//EVENT LISTENERS:

document.getElementById("fill-matrix-A").addEventListener("click", function () {
  generateMatrix("A");
});

document.getElementById("fill-matrix-B").addEventListener("click", function () {
  generateMatrix("B");
});

// prototyping

//

document.getElementById("plus-btn").addEventListener("click", function () {
  var a = [];
  var b = [];
  a = getMatrixFromDocument("A");
  b = getMatrixFromDocument("B");

  if (validateMatrix(a) == false || validateMatrix(b) == false) {
    alert("Please add numbers (exclusively) to all inputs!");
    return;
  }

  var result = [];
  result = addMatrices(a, b);

  if (typeof result == "string") {
    alert(result);
  } else {
    generateCInput("lines-A", "columns-A");
    generateMatrix("C");
    populateMatrix(result);
  }
});

document.getElementById("minus-btn").addEventListener("click", function () {
  var a = [];
  var b = [];
  a = getMatrixFromDocument("A");
  b = getMatrixFromDocument("B");

  if (validateMatrix(a) == false || validateMatrix(b) == false) {
    alert("Please add numbers (exclusively) to all inputs!");
    return;
  }

  var result = [];
  result = subMatrices(a, b);

  if (typeof result == "string") {
    alert(result);
  } else {
    generateCInput("lines-A", "columns-A");
    generateMatrix("C");
    populateMatrix(result);
  }
});

document.getElementById("multiply-btn").addEventListener("click", function () {
  var a = [];
  var b = [];
  a = getMatrixFromDocument("A");
  b = getMatrixFromDocument("B");

  if (validateMatrix(a) == false || validateMatrix(b) == false) {
    alert("Please add numbers (exclusively) to all inputs!");
    return;
  }

  var result = [];
  result = multiplyMatrices(a, b);

  if (typeof result == "string") {
    alert(result);
  } else {
    generateCInput("lines-A", "columns-B");
    generateMatrix("C");
    populateMatrix(result);
  }
});
