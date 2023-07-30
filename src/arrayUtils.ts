export function average(array: number[]): number {
	return array.reduce((a, b) => a + b) / array.length;
}

export function generateFreq(state: number[]): number[] {
	const freq: number[] = [];
	for (let index = 1; index <= 6; index++) {
		freq.push(state.filter((x) => x === index).length);
	}
	return freq;
}

export function removeValueFromArray(
	array: number[],
	valueToRemove: number
): number[] {
	const index = array.indexOf(valueToRemove);

	if (index === -1) {
		throw new Error(`Value ${valueToRemove} not found in array`);
	}

	array.splice(index, 1);
	return array;
}
