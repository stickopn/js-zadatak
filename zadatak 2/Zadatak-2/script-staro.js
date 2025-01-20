//////ARRAY
//file:///C:/js-zadatak/zadatak%202/Zadatak-2/index.html?m=10&n=8
// Dodati u URL-u na kraju index.html ?m=11&n=8
const grid = document.getElementById("grid");

const searchParams = new URLSearchParams(window.location.search); //izvlacenje broja redova i kolona iz adrese
x = searchParams.get('m'); // row
y = searchParams.get('n'); // col

//crtanje matrice
let gridArray = []; //[]ove zagrade znace newArray

// let availableElements = document.getElementsByClassName("available");
let selectedElements = document.getElementsByClassName("selected");
// let disabledElements = document.getElementsByClassName("disabled");

// Funkcija za izračunavanje cene na osnovu rednog broja\
// Refaktor koda
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
// Refaktor koda
function createSeatElement(i, j) {
    gridArray[i][j] = seat = document.createElement('div'); //pravi div seat

    seat.setAttribute("class", "COL available");
    seat.setAttribute("id", i + '-' + j);
    seat.setAttribute("row", i);
    seat.setAttribute("col", j);
}

// kreiranje array-a
for (let i = 0; i < x; i++) {
    gridArray[i] = row = document.createElement('div'); //pravi div row
    row.setAttribute("class", "ROW-MARK");
    row.setAttribute("id", i); //ne koristi se

    for (let j = 0; j < y; j++) {
        // Stari kod
        // gridArray[i][j] = seat = document.createElement('div'); //pravi div seat

        // seat.setAttribute("class", "COL available");
        // seat.setAttribute("id", i + '-' + j);
        // seat.setAttribute("row", i);
        // seat.setAttribute("col", j);
        createSeatElement(i, j, x);
        let price = calculatePrice(i, x);

        // Stari kod
        // //cena ako je m neparan
        // if (x % 2 !== 0) {
        //   let increment = (500 - 300) / ((x - 1) / 2);
        //   price(increment);
        // }
        // //cena ako je m paran
        // else {
        //   let increment = (500 - 300) / ((x / 2) - 1);
        //   price(increment);
        // }
        // function price(inc) {
        //   if (i < x / 2) {
        //     price = Math.round((300 + i * inc) * 100) / 100;
        //   } else {
        //     price = Math.round((300 + (x - i - 1) * inc) * 100) / 100;
        //   }
        // }

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
}
//funkcija za add/remove klase
function toggleClasses(element, c1, c2) {
    element.classList.remove(c1);
    element.classList.add(c2);
}

function clickSeat() {
    // Stari kod
    //ako je available, selektuj
    // if (this.nextSibling != null && this.previousSibling != null) {
    //   if (this.previousSibling.classList.contains("selected") && this.nextSibling.classList.contains("selected")) {
    //     alert('nije moguce ponistiti ovo polje');
    //   } else {
    //     this.classList.toggle("available");
    //     this.classList.toggle("selected");
    //   }
    // }
    // else if (this.nextSibling == null || this.previousSibling == null) {
    //   this.classList.toggle("available");
    //   this.classList.toggle("selected");

    // }
    // selectedCard();
    // priceSelected();

    // Refaktor koda
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
    // priceSelected();
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
                //  Stari kod
                // if (selectedLenght != 0) {

                //   //disablovati sve ostalo osim selektovanih, prethodnog i sledeceg mesta:
                //   if (seatLeft == null) {
                //     // console.log('jeste null prev');
                //     if (element.classList.contains("available")) {
                //       toggleClasses(element, 'available', 'disabled');
                //     }
                //     if (seatRight.classList.contains('disabled')) {
                //       toggleClasses(seatRight, 'disabled', 'available');
                //     }
                //   }
                //   else if (seatRight == null) {
                //     // console.log('jeste null next');
                //     if (element.classList.contains("available") || seatLeft.classList.contains('disabled')) {
                //       toggleClasses(element, 'available', 'disabled');
                //       toggleClasses(seatLeft, 'disabled', 'available');
                //     }
                //   }
                //   else if (elementId != seatLeftId && elementId != seatRightId) {
                //     if (element.classList.contains("available")) {
                //       toggleClasses(element, 'available', 'disabled');
                //     }
                //   }
                //   else if (elementId == seatLeftId || elementId == seatRightId) {
                //     //dati available jedan ispred i jedan iza
                //     if (seatLeft.classList.contains("disabled") || seatRight.classList.contains("disabled")) {
                //       toggleClasses(seatLeft, 'disabled', 'available');
                //       toggleClasses(seatRight, 'disabled', 'available');
                //     }
                //   }
                // }
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


// Refaktor koda
function handleElementState(element, selectedLenght, seatLeft, seatRight, elementId, seatLeftId, seatRightId) {
    if (selectedLenght != 0) {
        //disablovati sve ostalo osim selektovanih, prethodnog i sledeceg mesta:
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

// function priceSelected() {
//   //izracunavanje cene
//   let price = 0; //cena
//   for (let h = 0; h < selectedLenght; h++) { //niz selektovanih polja
//     price += selectedElements[h].price;
//     document.getElementById('value').innerText = price;
//   }
// }

function confirmSeats() {
    // let price = document.getElementById('value').textContent;

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
        // Stari kod koji treba da se refaktorise
        //red iznad
        // let rowAbove = (selectedRow - 1) + '-' + selectedCol;

        // //red ispod
        // let rowBelow = (selectedRow + 1) + '-' + selectedCol;

        // //isti red, polje levo
        // let thisRowLeft = selectedRow + '-' + (selectedColMin - 1);

        // //isti red, polje desno
        // let thisRowRight = selectedRow + '-' + (selectedColMax + 1);

        // //levo gore dijagonala
        // let rowAboveLeft = (selectedRow - 1) + '-' + (selectedColMin - 1);

        // //desno gore dijagonala
        // let rowAboveRight = (selectedRow - 1) + '-' + (selectedColMax + 1);

        // //levo dole dijagonala
        // let rowBelowLeft = (selectedRow + 1) + '-' + (selectedColMin - 1);

        // //desno dole dijagonala
        // let rowBelowRight = (selectedRow + 1) + '-' + (selectedColMax + 1);

        // aroundElementsArray.push(rowAbove, rowBelow, thisRowLeft, thisRowRight, rowAboveLeft, rowAboveRight, rowBelowLeft, rowBelowRight);


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

console.log(gridArray); //prikaz array-a