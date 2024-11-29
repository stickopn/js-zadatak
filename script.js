'use strict'
function generateBlocks() {
    const containerDiv = document.getElementById('container');
    const count = parseInt(document.getElementById('elementCount').value);
    containerDiv.innerHTML = ''; // Očisti prethodne blokove
    const halfCount = Math.floor(count / 2);
    for (let i = 0; i <= count; i++) {
        let maxLength = count.length;
        containerDiv.style.display = "flex";
        const block = document.createElement('div');
        block.className = 'block flex-wrap--box';
        // Izračunavanje boje na osnovu indeksa
        const shade = Math.floor(255 * (i / (count - 1))); // Od 0 do 255
        block.style.backgroundColor = `rgb(${shade}, ${shade}, ${shade})`;
        if (i < halfCount) {
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