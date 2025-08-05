/// Classes

// Node
class Node {
	constructor(value = null, next = null) {
		this.value = value;
		this.next = next;
	}
}

// Linked list
class LinkedList {
	constructor() {
		this.head = null;
		this.tail = null;
	}

	/// Methods

	// Add node to end of list
	append(value) {
		const NewNode = new Node(value);
		if (this.head === null) {
			// If list is empty
			this.head = NewNode;
			this.tail = NewNode;
		} else {
			// If list isn't empty
			this.tail.next = NewNode;
			this.tail = NewNode;
		}
	}

	// Add value to start of list
	prepend(value) {
		const NewNode = new Node(value, this.head);
		if (this.head === null) {
			// Make tail equal NewNode if list was empty
			this.tail = NewNode;
		}
		this.head = NewNode;
	}

	// Size of list
	size() {
		let size = 0;
		let curNode = this.head; // Start point

		while (curNode !== null) {
			size++;
			curNode = curNode.next; // Next node in list
		}

		return size;
	}

	// Node at index (counting from 0)
	at(index) {
		let countDown = index;
		let curNode = this.head; // Start point

		while (countDown > 0) {
			if (curNode === null) {
				// If current iteration is null, exit function
				return 'No node at this index';
			}
			countDown--;
			curNode = curNode.next;
		}

		if (curNode === null) {
			// Check if the end result is null, and exit if it is
			return 'No node at this index';
		}
		return curNode.value;
	}

	// Remove last node
	pop() {
		let curNode = this.head; // Start point
		let prevNode; // Keep track of previous node

		while (curNode.next !== null) {
			// Go to end of array, assign last and second last node to vars
			prevNode = curNode;
			curNode = curNode.next;
		}

		this.tail = prevNode; // Set second last node as tail
		prevNode.next = null; // Set second last nodes next as null
	}

	// Check if list contains a specific value
	contains(value) {
		let curNode = this.head; // Start point

		while (curNode !== null) {
			if (curNode.value.key === value) return true;
			curNode = curNode.next;
		}

		return false;
	}

	// Find index of node value in list
	find(value) {
		let curNode = this.head; // Start point
		let counter = 0;
		while (curNode !== null) {
			if (curNode.value.key === value) {
				return counter;
			}

			curNode = curNode.next;
			counter++;
		}

		return null; // If no node has the specific value
	}

	// Return visual representation of list
	toString() {
		let curNode = this.head; // Start point
		let str = '';

		while (curNode !== null) {
			str += `( ${curNode.value} ) -> `;
			curNode = curNode.next;
		}

		str += 'null';
		return str;
	}

	// Insert node at specific index
	insertAt(value, index) {
		let counter = 0;
		let curNode = this.head; // Start point
		let prevNode = this.head; // Keep track of previous node

		if (index > this.size()) {
			// Check if index is greater than size of list
			throw new Error('Index is greater than list size.');
			return;
		}

		if (index === 0) {
			// If index is 0, replace this.head
			const NewNode = new Node(value, this.head);
			this.head = NewNode;
			return;
		}

		while (counter < index) {
			prevNode = curNode;
			curNode = curNode.next;
			counter++;
		}

		const NewNode = new Node(value, curNode);
		prevNode.next = NewNode;
	}

	// Remove node at specific index
	removeAt(index) {
		let counter = 0;
		let curNode = this.head; // Start point
		let prevNode = this.head; // Keep track of previous node

		if (index >= this.size()) {
			// Check if index is greater or equal to size of list
			throw new Error('Index is greater than list size.');
			return;
		}

		if (index === 0) {
			// If index is 0, replace this.head
			this.head = this.head.next;
			return;
		}

		while (counter < index) {
			prevNode = curNode;
			curNode = curNode.next;
			counter++;
		}

		const nodeBehind = prevNode;
		const nodeInFront = curNode.next;
		nodeBehind.next = nodeInFront;
	}

	get(value) {
		let curNode = this.head; // Start point
		while (curNode.value.key !== value) {
			if (curNode === null) {
				return null;
			}
			curNode = curNode.next;
		}

		return curNode.value;
	}
}

export { LinkedList };
