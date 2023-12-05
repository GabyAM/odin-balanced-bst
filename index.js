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

function createTree(array) {
	function buildTree(array, start = 0, end = array.length - 1) {
		if (start > end) return null;
		const mid = Math.ceil((start + end) / 2);

		const rootNode = createNode(array[mid]);
		rootNode.left = buildTree(array, start, mid - 1);
		rootNode.right = buildTree(array, mid + 1, end);

		return rootNode;
	}

	const fixedArray = removeDuplicates(mergeSort(array));
	let root = buildTree(fixedArray);

	function insert(value) {
		function insertRecursive(value, node = root) {
			if (node === null) {
				return createNode(value);
			} else if (value < node.value) {
				node.left = insertRecursive(value, node.left);
			} else {
				node.right = insertRecursive(value, node.right);
			}
			return node;
		}
		//i didn't find a way to directly modify the root in the recursive function
		if (root === null) {
			root = createNode(value);
		} else {
			insertRecursive(value);
		}
	}

	function remove(value) {
			if (node.value === value) {
				if (node.left && node.right) {
					console.log(
						"here i should delete a node with two children"
					);
					return null;
				} else if (node.left) {
					return node.left;
				} else if (node.right) {
					return node.right;
				}
				return null;
			} else if (node.value > value) {
				node.left = removeRecursive(value, node.left);
			} else {
				node.right = removeRecursive(value, node.right);
			}
			return node;
		}
		removeRecursive(value, root);
	}

	return {
		root,
		insert,
		remove,
	};
}

const tree = createTree([1, 2, 1, 5, 6, 4, 1, 3]);
tree.insert(9);
tree.insert(8);
tree.remove(3);
