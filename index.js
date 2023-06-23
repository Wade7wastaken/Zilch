const average = (array) => array.reduce((a, b) => a + b) / array.length;

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

function testpairs(freq) {
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
			return [1500, []];
		} else if (testpairs(state, freq)) {
			return [1000, []];
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

const really_big_number = 10000000;

function averageScore(numDice) {
	const scores = [];
	for (let i = 0; i < really_big_number; i++) {
		const state = [];

		for (let j = 0; j < numDice; j++) {
			state.push(randInt(1, 6));
		}

		scores.push(score(state)[0]);
	}
	return average(scores);
}

function zilchProbability(numDice) {
	let total = 0;
	let zilches = 0;

	for (let i = 0; i < 10000000; i++) {
		const state = [];

		for (let j = 0; j < numDice; j++) {
			state.push(randInt(1, 6));
		}

		if (score(state)[0] === 0) zilches++;
		total++;
	}

	return zilches / total;
}

console.log("Zilch Probability for x dice:");
for (let i = 1; i <= 6; i++) {
	console.log(`${i}: ${zilchProbability(i)}`);
}

console.log("");

console.log("Average score for x dice:");
for (let i = 1; i <= 6; i++) {
	console.log(`${i}: ${averageScore(i)} points`);
}
