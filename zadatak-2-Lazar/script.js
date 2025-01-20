const cinemaWrapper = document.getElementById("cinemaWrapper");
let totalPriceDisplay = document.getElementById("totalPriceDisplay");

const searchParams = new URLSearchParams(window.location.search);
x = searchParams.get("m");
y = searchParams.get("n");

let rows = x;
let columns = y;
let totalPrice = 0;

for (let i = 0; i < rows; i++) {
    const row = document.createElement("div");
    row.className = "row";
    for (let j = 0; j < columns; j++) {
        const seat = document.createElement("div");
        seat.className = "seat";
        seat.setAttribute("data-seat-id", `${i + 1},${j + 1}`);
        row.appendChild(seat);
    }
    cinemaWrapper.appendChild(row);
}

const allSeats = Array.from(document.querySelectorAll(".seat"));

allSeats.forEach((seat) => {
    seat.addEventListener("click", (e) => {
        seat.classList.toggle("selected"); // Dodaje ili uklanja klasu "selected"
        updateTotalPrice(seat); // Proverava dostupnost sedišta
        seatAvailability();// Ispisuje objekat događaja u konzolu, što daje dodatne informacije o događaju
    });
});
setPrice();

function updateTotalPrice(seat) {
    const price = parseFloat(seat.textContent);

    if (seat.classList.contains("selected")) {
        totalPrice += price;
    } else {
        totalPrice -= price;
    }

    totalPriceDisplay.textContent = `Total Price: ${totalPrice}RSD`;
}

function seatAvailability() {
    allSeats.forEach((seat) => {
        seat.classList.remove("available");
    });

    const selectedSeats = [];
    allSeats.forEach((seat) => {
        if (seat.classList.contains("selected")) {
            selectedSeats.push(seat);
        }
    });

    if (selectedSeats.length === 0) {
        allSeats.forEach((seat) => {
            seat.classList.remove(...seat.classList);
            seat.classList.add("seat");
        });
    }

    if (selectedSeats.length > 0) {
        const firstSelectedSeat = selectedSeats[0];
        const lastSelectedSeat = selectedSeats[selectedSeats.length - 1];

        allSeats.forEach((seat) => {
            if (!seat.classList.contains("selected")) {
                seat.classList.add("unavailable");
            }
        });

        if (firstSelectedSeat.previousElementSibling) {
            firstSelectedSeat.previousElementSibling.classList.replace(
                "unavailable",
                "available"
            );
        }

        if (lastSelectedSeat.nextElementSibling) {
            lastSelectedSeat.nextElementSibling.classList.replace(
                "unavailable",
                "available"
            );
        }

        allSeats.forEach((seat) => {
            if (seat.classList.contains("unavailable-bought")) {
                seat.classList.remove(...seat.classList);
                seat.classList.add("seat", "unavailable-bought");
            }
        });
    }
}

let boughtSeats = [];

function buyTickets() {
    allSeats.forEach((seat) => {
        seat.classList.replace("selected", "bought");
    });

    allSeats.forEach((seat) => {
        if (seat.classList.contains("bought")) {
            boughtSeats.push(seat);
        }

        if (!seat.classList.contains("bought")) {
            seat.classList.remove(...seat.classList);
            seat.classList.add("seat");
        }
    });

    boughtSeats.forEach((seat) => {
        const seatId = seat.getAttribute("data-seat-id");
        const [rowIndex, colIndex] = seatId.split(",").map(Number);

        for (let i = rowIndex - 1; i <= rowIndex + 1; i++) {
            for (let j = colIndex - 1; j <= colIndex + 1; j++) {
                if (i === rowIndex && j === colIndex) continue;

                if (i >= 1 && i <= rows && j >= 1 && j <= columns) {
                    const targetSeats = allSeats.find(
                        (seat) => seat.getAttribute("data-seat-id") === `${i},${j}`
                    );
                    if (targetSeats && !targetSeats.classList.contains("bought")) {
                        targetSeats.classList.add("unavailable-bought");
                    }
                }
            }
        }
    });

    totalPrice = 0;
    totalPriceDisplay.textContent = `Total Price: ${totalPrice}RSD`;
}

function setPrice() {
    let allRows = Array.from(document.querySelectorAll(".row"));
    let numberOfRows = allRows.length;

    let firstRowPrice = 300;
    let middleRowPrice = 500;
    let lastRowPrice = 300;

    // Odd number of rows
    if (numberOfRows % 2 !== 0) {
        let upwardStepSize =
            (middleRowPrice - firstRowPrice) / Math.floor(numberOfRows / 2);
        let downwardStepSize =
            (middleRowPrice - lastRowPrice) / Math.floor(numberOfRows / 2);

        allRows.forEach((row, index) => {
            let allSeatsInRow = Array.from(row.querySelectorAll(".seat"));

            let currentPrice;
            if (index === 0) {
                currentPrice = firstRowPrice;
            } else if (index === Math.floor(numberOfRows / 2)) {
                currentPrice = middleRowPrice;
            } else if (index === numberOfRows - 1) {
                currentPrice = lastRowPrice;
            } else if (index < Math.floor(numberOfRows / 2)) {
                currentPrice = firstRowPrice + upwardStepSize * index;
            } else {
                currentPrice =
                    middleRowPrice -
                    downwardStepSize * (index - Math.floor(numberOfRows / 2));
            }

            allSeatsInRow.forEach((seat) => {
                seat.textContent = Math.round(currentPrice);
            });
        });
    }

    // Even number of rows
    if (numberOfRows % 2 === 0) {
        let upwardStepSize =
            (middleRowPrice - firstRowPrice) / (numberOfRows / 2 - 1);

        allRows.forEach((row, index) => {
            let allSeatsInRow = Array.from(row.querySelectorAll(".seat"));

            let currentPrice;
            if (index === 0) {
                currentPrice = firstRowPrice;
            } else if (index === numberOfRows - 1) {
                currentPrice = lastRowPrice;
            } else if (index < numberOfRows / 2 - 1) {
                currentPrice = firstRowPrice + upwardStepSize * index;
            } else if (index === numberOfRows / 2 - 1 || index === numberOfRows / 2) {
                currentPrice = middleRowPrice;
            } else {
                currentPrice =
                    firstRowPrice + upwardStepSize * (numberOfRows - 1 - index);
            }

            allSeatsInRow.forEach((seat) => {
                seat.textContent = Math.round(currentPrice);
            });
        });
    }
}