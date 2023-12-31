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
		function getSmallestValue(tree) {
			if (tree.left) {
				return getSmallestValue(tree.left);
			} else {
				return tree.value;
			}
		}

		function replace(node) {
			const newValue = getSmallestValue(node.right);
			node.value = newValue;
			node.right = removeRecursive(newValue, node.right);
			return node;
		}

		function removeRecursive(value, node) {
			if (node.value === value) {
				if (node.left && node.right) {
					return replace(node);
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
		if (root.value === value) {
			return replace(root);
		} else {
			removeRecursive(value, root);
		}
	}

	function find(value, node = root) {
		if (node === null) {
			return null;
		}
		if (node.value > value) {
			return find(value, node.left);
		} else if (node.value < value) {
			return find(value, node.right);
		}
		return node;
	}

	function levelOrder(callback) {
		const queue = [];
		queue.push(root);
		while (queue.length) {
			const currentNode = queue.shift();
			callback(currentNode);
			if (currentNode.left) {
				queue.push(currentNode.left);
			}
			if (currentNode.right) {
				queue.push(currentNode.right);
			}
		}
	}

	function traverse(callback, traverseCallback) {
		if (!callback) {
			array = [];
			traverseCallback((node) => {
				array.push(node.value);
			});
			return array;
		} else {
			traverseCallback(callback);
		}
	}

	function inOrder(callback = null) {
		return traverse(
			callback,
			function traverseInOrder(callback, node = root) {
				if (node !== null) {
					traverseInOrder(callback, node.left);
					callback(node);
					traverseInOrder(callback, node.right);
				}
			}
		);
	}

	function preOrder(callback = null) {
		return traverse(
			callback,
			function traversePreOrder(callback, node = root) {
				if (node !== null) {
					callback(node);
					traversePreOrder(callback, node.left);
					traversePreOrder(callback, node.right);
				}
			}
		);
	}

	function postOrder(callback = null) {
		return traverse(
			callback,
			function traversePostOrder(callback, node = root) {
				if (node !== null) {
					traversePostOrder(callback, node.left);
					traversePostOrder(callback, node.right);
					callback(node);
				}
			}
		);
	}

	function height(node) {
		if (node === null) {
			return 0;
		}
		const leftHeight = height(node.left);
		const rightHeight = height(node.right);
		return 1 + (leftHeight > rightHeight ? leftHeight : rightHeight);
	}

	function depth(node, tree = root) {
		if (tree === null || tree.value === node.value) {
			return 0;
		}

		let nextDepth;
		if (tree.value > node.value) {
			nextDepth = depth(node, tree.left);
		} else {
			nextDepth = depth(node, tree.right);
		}
		return 1 + nextDepth;
	}

	function isBalanced() {
		if (root !== null) {
			return Math.abs(height(root.left) - height(root.right)) <= 1;
		}
		return false;
	}

	function rebalance() {
		if (!isBalanced(root)) {
			const fixedArray = removeDuplicates(inOrder());
			root = buildTree(fixedArray);
		}
	}

	function getRoot() {
		return root;
	}

	return {
		getRoot,
		insert,
		remove,
		find,
		levelOrder,
		inOrder,
		preOrder,
		postOrder,
		isBalanced,
		rebalance,
	};
}

function createRandomArray(length) {
	const array = new Array(length);
	for (let i = 0; i < length; i++) {
		array[i] = Math.floor(Math.random() * 99) + 1;
	}
	return array;
}
function script() {
	function printAllOrders() {
		console.log("Tree in order");
		tree.inOrder((a) => {
			console.log(a.value);
		});
		console.log("Tree pre order");
		tree.preOrder((a) => {
			console.log(a.value);
		});
		console.log("Tree post order");
		tree.postOrder((a) => {
			console.log(a.value);
		});
	}
	const array = createRandomArray(20);
	const fixedArray = removeDuplicates(mergeSort(array));
	const tree = createTree(fixedArray);
	console.log("Is balanced: " + tree.isBalanced());
	printAllOrders();
	tree.insert(101);
	tree.insert(102);
	tree.insert(103);
	tree.insert(104);
	console.log("Is balanced: " + tree.isBalanced());
	tree.rebalance();
	console.log("Is balanced: " + tree.isBalanced());
	printAllOrders();
}
script();
/*tree.levelOrder((a) => {
	console.log(a.value);
});

console.log("Tree in order");
tree.inOrder((a) => {
	console.log(a.value);
});
console.log("Tree pre order");
tree.preOrder((a) => {
	console.log(a.value);
});
console.log("Tree post order");
tree.postOrder((a) => {
	console.log(a.value);
});
*/
