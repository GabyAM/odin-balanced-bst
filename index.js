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

	function levelOrder(callback, node = root) {
		const queue = [];
		queue.push(node);
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
	}

	return {
		root,
		insert,
		remove,
		find,
		levelOrder,
		inOrder,
		preOrder,
		postOrder,
	};
}

const tree = createTree([1, 2, 1, 5, 6, 4, 1, 3]);
tree.insert(9);
tree.insert(8);
tree.remove(4);
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
