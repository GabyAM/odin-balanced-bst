function createNode(value = null) {
	let left = null;
	let right = null;
	return {
		value,
		left,
		right,
	};
}

//made on previous project
function mergeSort(array) {
	if (array.length === 1) {
		return array;
	} else {
		const firstHalf = mergeSort(array.slice(0, array.length / 2));
		const secondHalf = mergeSort(array.slice(array.length / 2));

		let newArray = [];
		let i = 0;
		let j = 0;
		while (firstHalf[i] !== undefined || secondHalf[j] !== undefined) {
			let min;
			if (firstHalf[i] === undefined) {
				min = secondHalf.slice(j);
				j = secondHalf.length + 1;
			} else if (secondHalf[j] === undefined) {
				min = firstHalf.slice(i);
				i = firstHalf.length + 1;
			} else {
				if (firstHalf[i] < secondHalf[j]) {
					min = firstHalf[i];
					i++;
				} else {
					min = secondHalf[j];
					j++;
				}
			}
			newArray = newArray.concat(min);
		}
		return newArray;
	}
}

function removeDuplicates(array) {
	return array.filter((item, index) => {
		return array.indexOf(item) === index;
	});
}
