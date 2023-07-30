import { removeValueFromArray, average, generateFreq } from "./arrayUtils.js";

type DiceState = number[];

function randInt(min: number, max: number): number {
	min = Math.ceil(min);
	return Math.floor(Math.random() * (Math.floor(max) + 1 - min) + min);
}

// tests
function test1To6(state: DiceState): number {
	if (state.length !== 6) return 0;
	// if there's 1-6, return 1500 points and an empty state
	// else return 0 and whatever state was passed

	let i = 6;
	while (i--) {
		if (!state.includes(i)) return 0;
	}

	return 1500;
}

function testPairs(state: DiceState, freq: number[]): number {
	if (state.length !== 6) return 0;

	return freq.filter((x) => x === 2).length === 3 ? 1000 : 0;
}

function test3OfAKind(state: DiceState, freq: number[]): number {
	if (state.length < 3) return 0;

	let total = 0;

	for (const [index, frequency] of freq.entries()) {
		const diceValue = index + 1;
		if (frequency >= 3) {
			let baseValue = diceValue * 100;
			if (diceValue === 1) baseValue = 1000;

			for (let i = 0; i < frequency; i++)
				removeValueFromArray(state, diceValue);

			total += baseValue * (frequency - 2);
		}
	}

	return total;
}

function testNumber(state: DiceState, num: number, value: number): number {
	let score = 0;

	while (state.includes(num)) {
		removeValueFromArray(state, num);
		score += value;
	}

	return score;
}

function score(state: DiceState): number {
	const freq = generateFreq(state);

	return (
		test1To6(state) +
		testPairs(state, freq) +
		test3OfAKind(state, freq) +
		testNumber(state, 1, 100) +
		testNumber(state, 5, 50)
	);
}

const really_big_number = 1_000_000;

function averageScore(numDice: number): number {
	const scores: number[] = [];
	for (let i = 0; i < really_big_number; i++) {
		const state = [];

		for (let dice = 0; dice < numDice; dice++) {
			state.push(randInt(1, 6));
		}

		scores.push(score(state));
	}
	return average(scores);
}

function zilchProbability(numDice: number): number {
	let zilches = 0;

	for (let i = 0; i < really_big_number; i++) {
		const state = [];

		for (let j = 0; j < numDice; j++) {
			state.push(randInt(1, 6));
		}

		if (score(state) === 0) zilches++;
	}

	return zilches / really_big_number;
}

const start = performance.now();
console.log("Zilch Probability for x dice:");
for (let i = 1; i <= 6; i++) {
	console.log(`${i}: ${zilchProbability(i)}`);
}

console.log("");

console.log("Average score for x dice:");
for (let i = 1; i <= 6; i++) {
	console.log(`${i}: ${averageScore(i)} points`);
}
const end = performance.now();

console.log(`Final time: ${end - start}`);
