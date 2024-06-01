/**
 * An array with stored all the data of the properties
 * to be defined for the different objects
 */
const data = [
	{
		object: Object,
		properties: [
			/**
			 * Check if an object contains any circular reference
			 * @param {Object} object
			 * @return {Boolean}
			 */
			{
				name: 'isCyclic',
				value: function(object) {
					const checked = [];
					function check(object) {
						if (object instanceof Object) {
							if (checked.indexOf(object) !== -1)
								return true;
							checked.push(object);
							for (let key in object)
								if (object.has(key))
									return true;
						}
						return false;
					}
					return check(object);
				}
			},
			/**
			 * Compare two objects by their enumerable properties.
			 * In detailed mode, if the comparison returns true, return an object with:
			 * value (the result of the comparison, always true when returned in the detailed object),
			 * reference (true if all the references of the second object point to the first) and
			 * deep (true if all circular reference in both objects point to the same place in theirselves).
			 * @param {Object} object1
			 * @param {Object} object2
			 * @param {Boolean=} detailed=false
			 * @return {Boolean||Object}
			 *
			 * @examples
			 * Object.compare({ a: 1, b: 2 }, { b: 2, a: 1 }); // true
			 * Object.compare({ a: 1, b: 2 }, { x: 'hi' }); // false
			 * const o = {}, t = {}; o.a = o; t.a = t; Object.compare(o, t, true); //{value: true, reference: false, deep: true}
			 */
			{
				name: 'compare',
				value: function(object1, object2, detailed = false) {
					const compared = new Map();
					let comparison = {
						value: true,
						reference: true,
						deep: true
					};
					function traverse(object1, object2) {
						if (object1 instanceof Object === object2 instanceof Object) {
							if (object1 instanceof Object) {
								if (compared.has(object1)) {
									if (object1 === object2)
										comparison.deep = false;
									else {
										comparison.reference = false;
										comparison.value &= (object2 === compared.get(object1));
									}
								} else {
									compared.set(object1, object2);
									for (let key in object1)
										if (object1.has(key)) {
											if (object2.has(key))
												traverse(object1[key], object2[key]);
											else
												comparison.value = false;
										} else
											comparison.value = false;
								}
							} else
								comparison.value &= (object1 === object2);
						} else
							comparison.value = false;
					}
					traverse(object1, object2);
					comparison.value = !!comparison.value;
					return detailed?comparison.value?comparison:false:comparison.value;
				}
			},
			/**
			 * Make a non-referenced deep clone of an object.
			 * @param {Object} object
			 * @return {Object}
			 */
			{
				name: 'clone',
				value: function(object) {
					const clone = [];
					const cloned = new Map();
					function traverse(object, clone) {
						cloned.set(object, clone);
						for (let key in object)
							if (object.has(key))
								if (object[key] instanceof Object) {
									if (!cloned.has(object[key])) {
										clone[key] = [];
										traverse(object[key], clone[key]);
									}
									cloned.get(object)[key] = cloned.get(object[key]);
								} else
									cloned.get(object)[key] = object[key];
					}
					traverse(object, clone);
					return clone;
				}
			}
		]
	},
	{
		object: Object.prototype,
		properties: [
			/**
			 * Compare this to an object by its enumerable properties.
			 * In detailed mode, if the comparison returns true, return an object with:
			 * value (the result of the comparison, always true when returned in the detailed object),
			 * reference (true if all the references of the compared object point to this object) and
			 * deep (true if all circular reference in both objects point to the same place in theirselves).
			 * @param {Object} object The object to compare this one to.
			 * @param {Boolean=} detailed=false
			 * @return {Boolean||Object}
			 *
			 * @examples
			 * { a: 1, b: 2 }.compare({ b: 2, a: 1 }); // true
			 * { a: 1, b: 2 }.compare({ x: 'hi' }); // false
			 * const o = {}, t = {}; o.a = o; t.a = t; o.compare(t, true); //{value: true, reference: false, deep: true}
			 */
			{
				name: 'compare',
				value: function(object, detailed = false) {
					return Object.compare(this, object, detailed);
				}
			},
			/**
			 * Check if this object has the specified key.
			 * @param {String||Symbol} key
			 */
			{
				name: 'has',
				value: function(key) {
					return this.hasOwn?this.hasOwn(key):Object.prototype.hasOwnProperty.call(this, key)
				}
			},
			/**
			 * Return a non-referenced deep clone of this object.
			 * @return {Object}
			 */
			{
				name: 'clone',
				value: function() {
					return Object.clone(this);
				}
			}
		]
	},
	{
		object: Array,
		properties: [
			/**
			 * Make a non-referenced deep clone of an array.
			 * If the array contains non-array objects, the reference to them will be shared.
			 * @param {Array} array
			 * @return {Array}
			 */
			{
				name: 'clone',
				value: function(array) {
					const clone = [];
					const cloned = new Map();
					function traverse(array, clone) {
						cloned.set(array, clone);
						for (let key in array)
							if (array.has(key))
								if (array[key] instanceof Array) {
									if (!cloned.has(array[key])) {
										clone[key] = [];
										traverse(array[key], clone[key]);
									}
									cloned.get(array)[key] = cloned.get(array[key]);
								} else
									cloned.get(array)[key] = array[key];
					}
					traverse(array, clone);
					return clone;
				}
			}
		]
	},
	{
		object: Array.prototype,
		properties: [
			/**
			 * Return a non-referenced deep clone of this array.
			 * If the array contains non-array objects, the reference to them will be shared.
			 * To avoid this behaviour, use Object.clone(this) instead.
			 * @return {Array}
			 */
			{
				name: 'clone',
				value: function() {
					return Array.clone(this);
				}
			},
			/**
			 * Removes the first occurency of an element from an array, returning the index
			 * @param element
			 * @return {Number}
			 */
			{
				name: 'pull',
				value: function(element) {
					const index = this.indexOf(element);
					if (index > -1)
						this.splice(index, 1);
					return index;
				}
			},
			/**
			 * Pushes an item to an array, only if it does not already exist in the array.
			 * @param element
			 * @return {Boolean}
			 */
			{
				name: 'pushUnique',
				value: function(element) {
					if (this.indexOf(element) !== -1)
						return false;
					this.push(element);
					return true;
				}
			},
		]
	},
	{
		object: Math,
		properties: [
			/**
			 * Returns the sum of the given arguments
			 * @param {...Array[Number]} addends
			 * @return {Number}
			 */
			{
				name: 'sum',
				value: function(...addends) {
					return addends.reduce((a, b) => a + b);
				}
			},
			/**
			 * Returns the product of the given arguments
			 * @param {...Array[Number]} factors
			 * @return {Number}
			 */
			{
				name: 'prod',
				value: function(...factors) {
					return factors.reduce((a, b) => a * b);
				}
			},
			/**
			 * Stores a pre-calculated PI / 180 value.
			 * @type {Number}
			 */
			{
				name: 'PI180',
				value: Math.PI / 180
			},
			/**
			 * Converts degrees to radians.
			 * @param {Number} degrees
			 * @return {Number} radians
			 */
			{
				name: 'radians',
				value: function(degrees) {
					return degrees * Math.PI180;
				}
			},
			/**
			 * Converts radians to degrees.
			 * @param {Number} radians
			 * @return {Number} degrees
			 */
			{
				name: 'degrees',
				value: function(radians) {
					return radians / Math.PI180;
				}
			},
			/**
			 * Calculates the distance from the first point to the second point.
			 * @param {Array[Number]} x the coordinates of the first point.
			 * @param {Array[Number]} y the coordinates of the second point.
			 * @return {Number} the distance between the two points.
			 */
			{
				name: 'distance',
				value: function(a, b) {
					if (!(a instanceof Array) || !(b instanceof Array))
						throw new Error('Both arguments of Math.distance() must be arrays');
					if (a.length !== b.length)
						throw new Error('Both points must have the same number of coordinates');
					return Math.sqrt(Math.sum(...a.map((element, index) => Math.pow(a[index] - b[index], 2))));
				}
			},
			/**
			 * Clamps the value to within the min and max.
			 * If min > max, then their values are automatically swapped.
			 * @param {Number} value
			 * @param {Number} min
			 * @param {Number} max
			 * @return {Number}
			 *
			 * @example
			 * Math.clamp(3,4,5); //4
			 * Math.clamp(5,0,10); //5
			 */
			{
				name: 'clamp',
				value: function(value, min, max) {
					[min, max] = [min, max].sort();
					return Math.min(Math.max(value,min), max);
				}
			},
			/**
			 * Returns a random integer in the specified range
			 * If min > max, then their values are automatically swapped.
			 * @param {Number} min=0
			 * @param {Number} max
			 * @return {Number}
			 *
			 * @example
			 * Math.randomInt(5, 6);
			 */
			{
				name: 'randomInt',
				value: function(min, max = 0) {
					[min, max] = [min, max].sort();
					min = Math.ceil(min);
					max = Math.floor(max);
					return Math.floor(Math.random() * (max - min + 1)) + min;
				}
			},
		]
	}
];

/**
 * Add the indexOf method to all array objects if it does not already exist
 */
if (!Array.prototype.indexOf) {
	data.push({
		object: Array.prototype,
		properties: [
			/**
			 * Get the index of the passed item.
			 * @param {*} obj The item to find the index for.
			 * @return {Number} The index of the passed item or -1 if not found.
			 *
			 * @examples
			 * ['a','k','x'].indexOf('x'); // 2
			 * ['a','k','x'].indexOf('b'); // -1
			 */
			{
				name: 'indexOf',
				value: function(object) {
					for (let index = 0; index < this.length; index++)
						if (this[index] === object)
							return index;
					return -1;
				}
			},
		]
	});
}

/** Extend the canvas context CanvasRenderingContext2D with some helper methods */
if (typeof CanvasRenderingContext2D !== 'undefined') {
	data.push({
		object: CanvasRenderingContext2D,
		properties: [
			/**
			 * Add a circle to the current path.
			 * @param {Number} cx the x coordinate of the center
			 * @param {Number} cy the y coordinate of the center
			 * @param {Number} radius the radius of the circle
			 */
			{
				name: 'circle',
				value: function(cx, cy, radius) {
					this.arc(cx, cy, radius, 0, 2 * Math.PI, false);
				}
			}
		]
	});
}

/** Loop through the data array */
for (let item of data) {
	for (let property of item.properties) {
		/** Make property non-enumerable */
		Object.defineProperty(item.object, property.name, {
			enumerable: false,
			writable: true,
			configurable: true
		});
		/** Assign the property of the object to its value */
		item.object[property.name] = property.value;
	}
}

/** Check console and eventually fix */
if (typeof console === 'object') {
	if (typeof console.log === 'function') {
		if (!console.info)
			console.info = console.log;
		if (!console.warn)
			console.warn = console.log;
		if (!console.error)
			console.error = console.log;
	}
}else {
	/** Create dummy console */
	/* eslint-disable */
	console = {
		log() {},
		info() {},
		warn() {},
		error() {},
	};
	/* eslint-enable */
}
