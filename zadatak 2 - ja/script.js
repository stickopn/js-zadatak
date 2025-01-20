// Funkcija za čitanje parametara iz URL-a
function getURLParams() {
  // grid.innerHTML = '';
  const searchParams = new URLSearchParams(window.location.search); //izvlacenje broja redova i kolona iz adrese
  x = searchParams.get('m'); // row
  y = searchParams.get('n'); // col
  return { m, n };
}

// Funkcija za generisanje rasporeda
function generateSeats() {
  const { m, n } = getURLParams();
  const cinemaDiv = document.getElementById('cinema');
  cinemaDiv.innerHTML = '';  // Očisti prethodni raspored
  const seats = [];

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const seat = document.createElement('div');
      seat.classList.add('seat');
      seat.dataset.row = i;
      seat.dataset.col = j;
      seat.dataset.price = calculatePrice(i, m);
      seat.style.backgroundColor = getSeatColor(seat.dataset.price);

      seat.addEventListener('click', () => toggleSeat(seat));
      cinemaDiv.appendChild(seat);
      seats.push(seat);
    }
  }
}

// Funkcija za izračunavanje cene
function calculatePrice(row, totalRows) {
  const mid = Math.floor(totalRows / 2);
  if (row === 0 || row === totalRows - 1) {
    return 300;
  } else if (row === mid) {
    return 500;
  } else {
    return 400;
  }
}

// Funkcija za određivanje boje na osnovu cene
function getSeatColor(price) {
  if (price === 300) {
    return '#f44336'; // Crvena za najjeftinija sedišta
  } else if (price === 500) {
    return '#4CAF50'; // Zeleno za skuplja sedišta
  } else {
    return '#FF9800'; // Narandžasta za srednje cene
  }
}

// Funkcija za selektovanje/odabir sedišta
function toggleSeat(seat) {
  if (seat.classList.contains('unavailable')) return;
  seat.classList.toggle('selected');
  updateTotalPrice();
}

// Funkcija za ažuriranje ukupne cene
function updateTotalPrice() {
  const selectedSeats = document.querySelectorAll('.seat.selected');
  let total = 0;
  selectedSeats.forEach(seat => {
    total += parseInt(seat.dataset.price);
  });
  document.getElementById('totalPrice').textContent = `Ukupno: ${total} RSD`;
}

// Inicijalizacija
window.onload = function () {
  generateSeats();
}

document.getElementById('buyButton').addEventListener('click', function () {
  const selectedSeats = document.querySelectorAll('.seat.selected');
  if (selectedSeats.length > 0) {
    alert('Karte su uspešno kupljene!');
    selectedSeats.forEach(seat => seat.classList.add('unavailable')); // Označavamo sedišta kao zauzeta
    selectedSeats.forEach(seat => seat.classList.remove('selected')); // Skidamo selekciju
    updateTotalPrice();
  } else {
    alert('Morate izabrati sedišta!');
  }
});