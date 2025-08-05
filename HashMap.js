import { LinkedList } from './LinkedLists.js';

// Throw error if trying to access out of range bucket indexes
function checkIfIndexInbound(index, buckets) {
	if (index < 0 || index >= buckets.length) {
		throw new Error('Trying to access index out of bounds');
	}
}

/// Classes

// Element class
class Elem {
	constructor(key, value) {
		this.key = key;
		this.value = value;
	}
}

// HashMap class
class HashMap {
	constructor(loadFactor, capacity) {
		this.loadFactor = loadFactor;
		this.originalCapacity = capacity;
		this.capacity = capacity;
		this.buckets = new Array(capacity).fill(null);
	}

	// Hash the key
	hash(key) {
		let hashCode = 0;

		const primeNumber = 31;
		for (let i = 0; i < key.length; i++) {
			hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
		}
		return hashCode;
	}

	// Add a new element to the HashMap
	set(key, value) {
		const Pair = new Elem(key, value); // Key/value pair to be added
		const hashedKey = this.hash(key); // Find the bucket value corresponding to the hashed key

		if (this.buckets[hashedKey] === null) {
			// If bucket is empty, create a new linked list
			this.buckets[hashedKey] = new LinkedList();
		} else {
			// Look if key name is already in list and replace value if it is
			const index = this.buckets[hashedKey].find(key);
			if (index !== null) {
				// Change value of key and exit function
				this.buckets[hashedKey].at(index).value = value;
				return;
			}
		}

		if (this.length() >= this.capacity * this.loadFactor) {
			// Extend bucket size if necessary
			const newArray = [
				...this.buckets,
				...new Array(this.capacity).fill(null),
			];
			this.capacity *= 2;
			this.buckets = newArray;
		}

		this.buckets[hashedKey].append(Pair); // If key is new to bucket, append the key/value pair
	}

	// Get value of a key in HashMap
	get(key) {
		const hashedKey = this.hash(key); // Find the bucket value corresponding to the hashed key

		if (this.buckets[hashedKey] === null) {
			return null;
		}

		return this.buckets[hashedKey].get(key).value;
	}

	// Number of elements in HashMap
	length() {
		let length = 0;

		for (let i = 0; i < this.buckets.length; i++) {
			if (this.buckets[i] !== null) {
				length += this.buckets[i].size();
			}
		}

		return length;
	}

	// Check if key is in HashMap
	has(key) {
		const hashedKey = this.hash(key); // Find the bucket value corresponding to the hashed key

		if (this.buckets[hashedKey] === null) {
			// Return false if bucket is empty
			return false;
		}

		return this.buckets[hashedKey].contains(key);
	}

	// Remove element by key
	remove(key) {
		const hashedKey = this.hash(key); // Find the bucket value corresponding to the hashed key

		if (this.buckets[hashedKey] === null) {
			// Return false if bucket is empty
			return false;
		}

		if (this.buckets[hashedKey].contains(key)) {
			const index = this.buckets[hashedKey].find(key);
			this.buckets[hashedKey].removeAt(index);
		}
	}

	// Clear the HashMap
	clear() {
		this.capacity = this.originalCapacity;
		this.buckets = new Array(this.capacity).fill(null);
	}

	keys() {
		let arr = [];
		for (let i = 0; i < this.capacity; i++) {
			if (this.buckets[i] !== null) {
				const additionalArr = this.buckets[i].keysToArray();
				arr = arr.concat(additionalArr);
			}
		}
		return arr;
	}

	values() {
		let arr = [];
		for (let i = 0; i < this.capacity; i++) {
			if (this.buckets[i] !== null) {
				const additionalArr = this.buckets[i].valuesToArray();
				arr = arr.concat(additionalArr);
			}
		}
		return arr;
	}

	entries() {
		let arr = [];
		for (let i = 0; i < this.capacity; i++) {
			if (this.buckets[i] !== null) {
				const additionalArr = this.buckets[i].elemsToArray();
				arr = arr.concat(additionalArr);
			}
		}
		return arr;
	}
}

const map = new HashMap(0.75, 16);

map.set('apple', 'red');
map.set('banana', 'yellow');
map.set('carrot', 'orange');
map.set('dog', 'brown');
map.set('elephant', 'gray');
map.set('frog', 'green');
map.set('grape', 'purple');
map.set('hat', 'black');
map.set('ice cream', 'white');
map.set('jacket', 'blue');
map.set('kite', 'pink');
map.set('lion', 'golden');
console.log(map.capacity);
map.set('lion', 'fisse');
console.log(map.capacity);
