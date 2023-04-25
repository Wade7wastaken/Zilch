function randInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max) + 1;
	return Math.floor(Math.random() * (max - min) + min);
}

function test1to6(state) {
	return (
		state[0] == 1 &&
		state[1] == 2 &&
		state[2] == 3 &&
		state[3] == 4 &&
		state[4] == 5 &&
		state[5] == 6
	);
}

function testpairs(state, freq) {
	return freq.filter((x) => x === 2).length === 3;
}

/**
 *
 * @param {Array<number>} s
 */
function score(s) {
	let state = [];
	s.forEach((el) => {
		state.push(el);
	});
	state.sort();
	//console.log(state);

	const freq = [
		state.filter((x) => x === 1).length,
		state.filter((x) => x === 2).length,
		state.filter((x) => x === 3).length,
		state.filter((x) => x === 4).length,
		state.filter((x) => x === 5).length,
		state.filter((x) => x === 6).length,
	];

	if (state.length == 6) {
		if (test1to6(state)) {
			return 1500;
		} else if (testpairs(state, freq)) {
			return 1000;
		}
	}

	let total = 0;

	for (const [v, frequency] of freq.entries()) {
		const value = v + 1;
		if (frequency >= 3) {
			let basevalue = value * 100;
			if (value === 1) {
				basevalue = 1000;
			}
			total += basevalue * (frequency - 2);
			state.splice(state.indexOf(value), 1);
			state.splice(state.indexOf(value), 1);
			state.splice(state.indexOf(value), 1);
		}
	}

	while (state.includes(1)) {
		state.splice(state.indexOf(1), 1);
		total += 100;
	}

	while (state.includes(5)) {
		state.splice(state.indexOf(1), 1);
		total += 50;
	}

	return [total, state];
}

const list = [];

for (let i = 0; i < 1000000; i++) {
	const state = [
		randInt(1, 6),
		randInt(1, 6),
		randInt(1, 6),
		randInt(1, 6),
		randInt(1, 6),
		randInt(1, 6),
	];
	list.push(score(state));
}

console.log(list.reduce((a, b) => a + b) / list.length);
