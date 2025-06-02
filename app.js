const COLUMNS = 15;
const ROWS = 15;

/** @type {HTMLElement} */
const gameSection = document.querySelector("section.game");

// Filling the game section with cells
for (let i = 0; i < ROWS; ++i) {
	const row = document.createElement("div");
	row.classList.add("flex");
	for (let j = 0; j < COLUMNS; ++j) {
		const cell = document.createElement("div");
		cell.classList.add("cell");
		row.appendChild(cell);
	}
	gameSection.appendChild(row);
}

/** @type {HTMLDivElement[]} */
const cells = document.querySelectorAll("div.cell");
for (const cell of cells) {
	cell.onclick = () => {
		cell.classList.toggle("cell-on");
	};
}

function tick() {
	for (let i = 0; i < ROWS; ++i) {
		for (let j = 0; j < COLUMNS; ++j) {
			const row = gameSection.children.item(i);
			const cell = row.children.item(j);

			// TODO: logic to see if cell dies or thrives
		}
	}
}
