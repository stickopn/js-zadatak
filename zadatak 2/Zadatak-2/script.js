//////ARRAY
// Dodati u URL-u na kraju index.html ?m=11&n=8
const grid = document.getElementById("grid");

const searchParams = new URLSearchParams(window.location.search); //izvlacenje broja redova i kolona iz adrese
const x = searchParams.get('m'); // row
const y = searchParams.get('n'); // col

//crtanje matrice
let gridArray = []; //[]ove zagrade znace newArray
let newArray = createGrid(x, y);
gridArray = gridArray.concat(newArray);
let selectedElements = document.getElementsByClassName("selected");

// Funkcija za izračunavanje cene na osnovu rednog broja
function calculatePrice(i, x) {
  let increment;
  if (x % 2 !== 0) {
    increment = (500 - 300) / ((x - 1) / 2);
  } else {
    increment = (500 - 300) / ((x / 2) - 1);
  }
  let price;
  if (i < x / 2) {
    price = Math.round((300 + i * increment) * 100) / 100;
  } else {
    price = Math.round((300 + (x - i - 1) * increment) * 100) / 100;
  }
  return price;
}

// Funkcija za kreiranje seat elemenata
function createSeatElement(i, j) {
  gridArray[i][j] = seat = document.createElement('div'); //pravi div seat
  seat.setAttribute("class", "COL available");
  seat.setAttribute("id", i + '-' + j);
  seat.setAttribute("row", i);
  seat.setAttribute("col", j);
  let price = calculatePrice(i, x);
  //proveriti zasto se ovo koristi za  kupovinu
  seat.row = i;
  seat.col = j;
  seat.price = price;
  // seat.innerText = 'Red' + i + ' Colona' + j + ' Cena' + price;
  seat.innerText = price;
  seat.addEventListener('click', clickSeat);
  //iscrtaj grid
  grid.appendChild(row);
  row.appendChild(seat);
}

// Glavna funkcija za izradu grid-a
function createGrid(x, y) {
  // kreiranje array-a
  for (let i = 0; i < x; i++) {
    gridArray[i] = row = document.createElement('div'); //pravi div row
    row.setAttribute("class", "ROW-MARK");
    for (let j = 0; j < y; j++) {
      createSeatElement(i, j);
    }
  }
}

//funkcija za add/remove klase
function toggleClasses(element, c1, c2) {
  element.classList.remove(c1);
  element.classList.add(c2);
}

function clickSeat() {
  const hasAdjacentSelected = this.previousSibling && this.previousSibling.classList.contains("selected") &&
    this.nextSibling && this.nextSibling.classList.contains("selected");
  if (hasAdjacentSelected) {
    alert('Nije moguće poništiti ovo polje');
    return; // Raniji izlaz ako su oba susedna polja selektovana
  }
  // Prebacivanje "available" i "selected" klasa
  this.classList.toggle("available");
  this.classList.toggle("selected");
  selectedCard();
}

function selectedCard() {
  const selectedElementsArray = Array.from(selectedElements);
  console.log('selektovani elementi click' + selectedElementsArray);
  let selectedLenght = selectedElements.length;
  for (let r = 0; r < x; r++) { //niz row-ova
    for (let c = 0; c < y; c++) { //niz colona
      let elementId = r + '-' + c;
      let element = document.getElementById(elementId);
      let price = 0; //cena
      for (let k = 0; k < selectedElements.length; k++) {
        let selectedRow = selectedElementsArray[0].row;
        let selectedColMin = selectedElementsArray[0].col - 1;
        let selectedColMax = selectedElementsArray[selectedElements.length - 1].col + 1;
        //polje levo
        let seatLeftId = selectedRow + '-' + selectedColMin;
        let seatLeft = document.getElementById(seatLeftId);
        //polje desno
        let seatRightId = selectedRow + '-' + selectedColMax;
        let seatRight = document.getElementById(seatRightId);

        handleElementState(element, selectedLenght, seatLeft, seatRight, elementId, seatLeftId, seatRightId);
        price += selectedElements[k].price;
        document.getElementById('value').innerText = price;
      }
      if (selectedLenght == 0 || selectedLenght == null) {
        //ako nema vise selektovanih polja, dati svim poljima available
        toggleClasses(element, 'disabled', 'available');

        price = 0;
        document.getElementById('value').innerText = price;
      }
    }
  }
}

function handleElementState(element, selectedLenght, seatLeft, seatRight, elementId, seatLeftId, seatRightId) {
  if (selectedLenght != 0) {
    if (seatLeft == null) {
      // console.log('jeste null prev');
      if (element.classList.contains("available")) {
        toggleClasses(element, 'available', 'disabled');
      }
      if (seatRight.classList.contains('disabled')) {
        toggleClasses(seatRight, 'disabled', 'available');
      }
    }
    else if (seatRight == null) {
      // console.log('jeste null next');
      if (element.classList.contains("available") || seatLeft.classList.contains('disabled')) {
        toggleClasses(element, 'available', 'disabled');
        toggleClasses(seatLeft, 'disabled', 'available');
      }
    }
    else if (elementId != seatLeftId && elementId != seatRightId) {
      if (element.classList.contains("available")) {
        toggleClasses(element, 'available', 'disabled');
      }
    }
    else if (elementId == seatLeftId || elementId == seatRightId) {
      //dati available jedan ispred i jedan iza
      if (seatLeft.classList.contains("disabled") || seatRight.classList.contains("disabled")) {
        toggleClasses(seatLeft, 'disabled', 'available');
        toggleClasses(seatRight, 'disabled', 'available');
      }
    }
  }
}

function confirmSeats() {
  //array selektovanih elemenata
  const selectedElementsArray = Array.from(selectedElements);
  console.log('selektovani elementi' + selectedElementsArray);

  //array svih elemenata okolo
  let aroundElementsArray = [];
  for (let k = 0; k < selectedElements.length; k++) {
    let selectedRow = selectedElementsArray[0].row;
    let selectedCol = selectedElementsArray[k].col;
    let selectedColMin = selectedElementsArray[0].col;
    let selectedColMax = selectedElementsArray[selectedElements.length - 1].col;

    console.log(selectedRow, + ' ' + selectedCol, + ' ' + selectedColMin, + ' ' + selectedColMax);
    //Refaktor kroz objekat
    let surroundingElements = {
      rowAbove: (selectedRow - 1) + '-' + selectedCol,
      rowBelow: (selectedRow + 1) + '-' + selectedCol,
      thisRowLeft: selectedRow + '-' + (selectedColMin - 1),
      thisRowRight: selectedRow + '-' + (selectedColMax + 1),
      rowAboveLeft: (selectedRow - 1) + '-' + (selectedColMin - 1),
      rowAboveRight: (selectedRow - 1) + '-' + (selectedColMax + 1),
      rowBelowLeft: (selectedRow + 1) + '-' + (selectedColMin - 1),
      rowBelowRight: (selectedRow + 1) + '-' + (selectedColMax + 1)
    };

    // Dodavanje okolnih elemenata u niz
    aroundElementsArray.push(
      surroundingElements.rowAbove,
      surroundingElements.rowBelow,
      surroundingElements.thisRowLeft,
      surroundingElements.thisRowRight,
      surroundingElements.rowAboveLeft,
      surroundingElements.rowAboveRight,
      surroundingElements.rowBelowLeft,
      surroundingElements.rowBelowRight
    );
    console.log(`Red: ${selectedRow}, Kolona: ${selectedCol}, Min col: ${selectedColMin}, Max col: ${selectedColMax}`);
  }
  //elementi oko selektovanih
  console.log('around elements ' + aroundElementsArray);
  for (let r = 0; r < x; r++) { //niz row-ova
    for (let c = 0; c < y; c++) { //niz colona
      let elementId = r + '-' + c;
      let element = document.getElementById(elementId);

      if (element.classList.contains("selected")) {
        toggleClasses(element, 'selected', 'bought');
      } else if (aroundElementsArray.includes(element.id) && !element.classList.contains("selected")) {
        toggleClasses(element, 'available', 'disabled-bought');
        toggleClasses(element, 'disabled', 'disabled-bought');
      }
      else if (!aroundElementsArray.includes(element.id) && !element.classList.contains("selected")) {
        toggleClasses(element, 'disabled', 'available');
      }

    }
  }
  price = 0; //ponisti cenu
  document.getElementById('value').innerText = price;

}

console.log("Grid array", gridArray); //prikaz array-a