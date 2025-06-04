const COLUMNS = 100;
const ROWS = 100;

/** @type {HTMLElement} */
const gameSection = document.querySelector("section.game");

let playEv = undefined;

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
	const toDie = [];
	const toLive = [];
	for (let i = 0; i < ROWS; ++i) {
		for (let j = 0; j < COLUMNS; ++j) {
			const row = gameSection.children.item(i);
			const cell = row.children.item(j);
			let neighbours = 0;

			for (let x = -1; x < 2; ++x) {
				for (let y = -1; y < 2; ++y) {
					const xind = i + x;
					const yind = j + y;
					if (xind < 0 || yind < 0 || xind >= ROWS || yind >= COLUMNS) {
						continue;
					}

					const ncell = gameSection.children.item(xind).children.item(yind);
					if (cell.isSameNode(ncell)) {
						continue;
					}
					if (ncell.classList.contains("cell-on")) {
						++neighbours;
					}
				}
			}

			if (neighbours < 2 || neighbours > 3) {
				toDie.push(cell);
			}
			if (neighbours === 3) {
				toLive.push(cell);
			}
		}
	}
	for (const c of toLive) {
		c.classList.add("cell-on");
	}

	for (const c of toDie) {
		c.classList.remove("cell-on");
	}
}

document.querySelector("button.tick-btn").onclick = tick;
document.querySelector("button.play-btn").onclick = () => {
	if (playEv) return;
	playEv = setInterval(tick, 100);
};

document.querySelector("button.stop-btn").onclick = () => {
	clearInterval(playEv);
	playEv = undefined;
};
