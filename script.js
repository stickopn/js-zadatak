'use strict'
function generateBlocks() {
    const containerDiv = document.getElementById('container');
    // parseInt() metoda pretvara string u tekst, ignorise decimale. Mada nije potrebna za koriscenje
    const count = parseInt(document.getElementById('elementCount').value);
    containerDiv.innerHTML = ''; // Očisti prethodne blokove
    // const halfCount = Math.floor(count / 2); Nije potrebno, za promenu boje teksta, resio sam to na nacin da se boja menja na osnovu nijanse rgb boje
    for (let i = 0; i < count; i++) {
        const block = document.createElement('div');
        block.className = 'block flex-wrap--box';
        // Izračunavanje boje na osnovu indeksa
        const shade = Math.floor(255 * (i / (count - 1))); // Od 0 do 255
        // Math.floor() metoda zaokruzuje broj na celobrojnu vrednost, takodje nije neophodna
        block.style.backgroundColor = `rgb(${shade}, ${shade}, ${shade})`;
        if (shade < 150) {
            block.style.color = "#ffffff";
        } else {
            block.style.color = "#000000";
        }
        const text = document.createElement('span');
        text.textContent = `Ja sam ${i + 1}. element`;
        block.appendChild(text);
        container.appendChild(block);
    }
}