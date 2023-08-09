import { average, generateFreq } from "./arrayUtils.js";

function randDice(): number {
	return Math.floor(Math.random() * 6 + 1);
}

// tests
function test1To6(freq: number[]): boolean {
	// we don't need to adjust freq here because we return right away
	return (
		freq[0] == 1 &&
		freq[1] == 1 &&
		freq[2] == 1 &&
		freq[3] == 1 &&
		freq[4] == 1 &&
		freq[5] == 1
	);
}

function testPairs(freq: number[]): boolean {
	// we don't need to adjust freq here because we return right away
	return freq.filter((x) => x === 2).length === 3;
}

function test3OfAKind(freq: number[], length: number): number {
	if (length < 3) return 0;

	let total = 0;

	for (const [index, frequency] of freq.entries()) {
		const diceValue = index + 1;
		if (frequency >= 3) {
			freq[index] = 0;
			total +=
				(diceValue === 1 ? 1000 : diceValue * 100) * (frequency - 2);
		}
	}

	return total;
}

function testNumber(freq: number[], num: number, value: number): number {
	const occurrences = freq[num - 1];
	freq[num - 1] = 0;
	return occurrences * value;
}

function score(state: number[]): number {
	const freq = generateFreq(state);

	const length = state.length;

	if (length === 6) {
		if (test1To6(freq)) return 1500;
		if (testPairs(freq)) return 1000;
	}

	return (
		test3OfAKind(freq, length) +
		testNumber(freq, 1, 100) +
		testNumber(freq, 5, 50)
	);
}

// tests

console.assert(score([2, 3, 4, 5, 6, 1]) === 1500);
console.assert(score([1, 1, 2, 2, 3, 3]) === 1000);
console.assert(score([5, 6, 5, 4, 6, 4]) === 1000);
console.assert(score([1, 1, 1, 2, 3, 4]) === 1000);
console.assert(score([1, 1, 1, 2, 2, 2]) === 1200);
console.assert(score([2, 6, 2, 5, 5, 2]) === 300);
console.assert(score([1, 1, 1, 1, 5, 5]) === 2100);

const really_big_number = 100_000_000;

function averageScore(numDice: number): number {
	const scores: number[] = [];
	for (let i = 0; i < really_big_number; i++) {
		const state: number[] = [];

		for (let dice = 0; dice < numDice; dice++) {
			state.push(randDice());
		}

		scores.push(score(state));
	}
	return average(scores);
}

function zilchProbability(numDice: number): number {
	let zilches = 0;

	for (let i = 0; i < really_big_number; i++) {
		const state: number[] = [];

		for (let j = 0; j < numDice; j++) {
			state.push(randDice());
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

console.log(`Final time: ${end - start} ms`);
